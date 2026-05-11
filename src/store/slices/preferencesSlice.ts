import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserPreferences, ContentCategory, ContentType, Language, ThemeMode } from '@/types';

const initialState: UserPreferences = {
  categories: ['technology', 'entertainment', 'sports'],
  language: 'en',
  theme: 'dark',
  feedLayout: 'grid',
  contentSources: ['news', 'movie', 'social'],
  notificationsEnabled: true,
  autoRefresh: false,
  refreshInterval: 5,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ContentCategory[]>) {
      state.categories = action.payload;
    },
    toggleCategory(state, action: PayloadAction<ContentCategory>) {
      const idx = state.categories.indexOf(action.payload);
      if (idx >= 0) {
        if (state.categories.length > 1) state.categories.splice(idx, 1);
      } else {
        state.categories.push(action.payload);
      }
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setFeedLayout(state, action: PayloadAction<'grid' | 'list'>) {
      state.feedLayout = action.payload;
    },
    toggleContentSource(state, action: PayloadAction<ContentType>) {
      const idx = state.contentSources.indexOf(action.payload);
      if (idx >= 0) {
        if (state.contentSources.length > 1) state.contentSources.splice(idx, 1);
      } else {
        state.contentSources.push(action.payload);
      }
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleAutoRefresh(state) {
      state.autoRefresh = !state.autoRefresh;
    },
    setRefreshInterval(state, action: PayloadAction<number>) {
      state.refreshInterval = action.payload;
    },
    resetPreferences() {
      return initialState;
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setLanguage,
  setTheme,
  toggleTheme,
  setFeedLayout,
  toggleContentSource,
  toggleNotifications,
  toggleAutoRefresh,
  setRefreshInterval,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
