import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { FeedState, ContentItem, ContentCategory } from '@/types';
import { fetchNews, fetchMovies, fetchSocialPosts } from '@/lib/api';
import { RootState } from '../index';

const initialState: FeedState = {
  items: [],
  trendingItems: [],
  favoriteItems: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  activeCategory: 'all',
  itemOrder: [],
};

// Async thunks for fetching data
export const fetchFeedContent = createAsyncThunk(
  'feed/fetchContent',
  async (page: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { categories, contentSources } = state.preferences;
      const { searchQuery, activeCategory } = state.feed;
      
      const fetchPromises = [];
      const queryCat = activeCategory !== 'all' ? activeCategory : categories[0] || 'technology';
      
      if (contentSources.includes('news')) {
        fetchPromises.push(fetchNews(searchQuery || queryCat, page));
      }
      if (contentSources.includes('movie')) {
        fetchPromises.push(fetchMovies(searchQuery || 'trending', page));
      }
      if (contentSources.includes('social')) {
        fetchPromises.push(fetchSocialPosts(searchQuery || queryCat, page));
      }
      
      const results = await Promise.all(fetchPromises);
      return results.flat().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch content');
    }
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'feed/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const [news, movies, social] = await Promise.all([
        fetchNews('trending', 1),
        fetchMovies('popular', 1),
        fetchSocialPosts('viral', 1)
      ]);
      return [...news.slice(0, 4), ...movies.slice(0, 4), ...social.slice(0, 4)]
        .sort(() => Math.random() - 0.5); // Randomize trending
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending content');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
      state.items = [];
      state.itemOrder = [];
    },
    setActiveCategory(state, action: PayloadAction<ContentCategory | 'all'>) {
      state.activeCategory = action.payload;
      state.page = 1;
      state.items = [];
      state.itemOrder = [];
    },
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const item = action.payload;
      const isFav = state.favoriteItems.some(fav => fav.id === item.id);
      
      if (isFav) {
        state.favoriteItems = state.favoriteItems.filter(fav => fav.id !== item.id);
      } else {
        state.favoriteItems.push({ ...item, isFavorite: true });
      }
      
      // Update in items list if present
      const itemIndex = state.items.findIndex(i => i.id === item.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].isFavorite = !isFav;
      }
      
      // Update in trending list if present
      const trendingIndex = state.trendingItems.findIndex(i => i.id === item.id);
      if (trendingIndex >= 0) {
        state.trendingItems[trendingIndex].isFavorite = !isFav;
      }
    },
    reorderItems(state, action: PayloadAction<string[]>) {
      state.itemOrder = action.payload;
      // Reorder actual items array to match
      if (state.itemOrder.length === state.items.length) {
        const orderMap = new Map(state.itemOrder.map((id, index) => [id, index]));
        state.items.sort((a, b) => (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0));
      }
    },
    clearFeed(state) {
      state.items = [];
      state.page = 1;
      state.itemOrder = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedContent.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedContent.fulfilled, (state, action) => {
        state.loading = false;
        
        // Handle favorite status sync
        const newItems = action.payload.map(item => ({
          ...item,
          isFavorite: state.favoriteItems.some(fav => fav.id === item.id)
        }));
        
        if (state.page === 1) {
          state.items = newItems;
        } else {
          // Filter out duplicates
          const existingIds = new Set(state.items.map(i => i.id));
          const uniqueNewItems = newItems.filter(i => !existingIds.has(i.id));
          state.items = [...state.items, ...uniqueNewItems];
        }
        
        state.itemOrder = state.items.map(i => i.id);
        state.hasMore = action.payload.length > 0;
        state.page += 1;
      })
      .addCase(fetchFeedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.trendingItems = action.payload.map(item => ({
          ...item,
          isFavorite: state.favoriteItems.some(fav => fav.id === item.id)
        }));
      });
  },
});

export const { setSearchQuery, setActiveCategory, toggleFavorite, reorderItems, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
