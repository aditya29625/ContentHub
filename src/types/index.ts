export type ContentCategory = 
  | 'technology' 
  | 'sports' 
  | 'finance' 
  | 'entertainment' 
  | 'health' 
  | 'science' 
  | 'politics' 
  | 'gaming';

export type ContentType = 'news' | 'movie' | 'social';

export type ThemeMode = 'light' | 'dark';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  source: string;
  publishedAt: string;
  category: ContentCategory;
  isFavorite: boolean;
  tags: string[];
  author?: string;
  rating?: number;
  likes?: number;
  comments?: number;
}

export interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface MovieItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hashtags: string[];
  platform: 'twitter' | 'instagram' | 'reddit';
}

export interface UserPreferences {
  categories: ContentCategory[];
  language: Language;
  theme: ThemeMode;
  feedLayout: 'grid' | 'list';
  contentSources: ContentType[];
  notificationsEnabled: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // minutes
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

export interface FeedState {
  items: ContentItem[];
  trendingItems: ContentItem[];
  favoriteItems: ContentItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
  activeCategory: ContentCategory | 'all';
  itemOrder: string[];
}

export interface UIState {
  sidebarOpen: boolean;
  settingsPanelOpen: boolean;
  searchFocused: boolean;
}
