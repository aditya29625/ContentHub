import axios from 'axios';
import { ContentItem, ContentCategory, NewsArticle, MovieItem, SocialPost } from '@/types';

// Mock data generator for fallback when APIs fail or keys are missing
const generateMockId = () => Math.random().toString(36).substr(2, 9);

const MOCK_CATEGORIES: ContentCategory[] = ['technology', 'sports', 'finance', 'entertainment', 'health', 'science', 'politics', 'gaming'];

export const fetchNews = async (query: string, page: number): Promise<ContentItem[]> => {
  try {
    // In a real app, you'd use a proxy or server action to hide API keys
    // For this assignment, we'll simulate the response with rich mock data if no key
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=MOCK_KEY`).catch(() => null);
    
    if (response?.data?.articles) {
      return response.data.articles.map((article: NewsArticle) => ({
        id: article.url || generateMockId(),
        type: 'news',
        title: article.title,
        description: article.description || 'No description available',
        imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000',
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        category: query as ContentCategory,
        isFavorite: false,
        tags: [query, 'news'],
      }));
    }

    // Fallback Mock Data
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `news-${page}-${i}-${generateMockId()}`,
      type: 'news',
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} Update: Major Breakthrough in ${query} Sector`,
      description: `Exploring the latest trends and developments in ${query}. Industry experts weigh in on what this means for the future of the global market.`,
      imageUrl: `https://source.unsplash.com/featured/?${query},news&sig=${i}`,
      url: '#',
      source: 'Global News Network',
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      category: query as ContentCategory,
      isFavorite: false,
      tags: [query, 'trending'],
    }));
  } catch (error) {
    console.error('News API Error:', error);
    return [];
  }
};

export const fetchMovies = async (query: string, page: number): Promise<ContentItem[]> => {
  try {
    // Simulating TMDB API
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=MOCK_KEY`).catch(() => null);
    
    if (response?.data?.results) {
      return response.data.results.map((movie: MovieItem) => ({
        id: `movie-${movie.id}`,
        type: 'movie',
        title: movie.title,
        description: movie.overview,
        imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000',
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        source: 'TMDB',
        publishedAt: movie.release_date || new Date().toISOString(),
        category: 'entertainment',
        isFavorite: false,
        tags: ['movie', 'entertainment'],
        rating: movie.vote_average,
      }));
    }

    // Fallback Mock Data
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `movie-${page}-${i}-${generateMockId()}`,
      type: 'movie',
      title: `${query === 'trending' ? 'The Great Adventure' : query + ' Chronicles'}`,
      description: 'A cinematic masterpiece following the journey of unexpected heroes in a world full of mystery and excitement.',
      imageUrl: `https://source.unsplash.com/featured/?movie,${query}&sig=${i}`,
      url: '#',
      source: 'CineStream',
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      category: 'entertainment',
      isFavorite: false,
      tags: ['movie', 'entertainment'],
      rating: 8.5,
    }));
  } catch (error) {
    console.error('Movies API Error:', error);
    return [];
  }
};

export const fetchSocialPosts = async (query: string, page: number): Promise<ContentItem[]> => {
  // Simulating Social Media API (Twitter/Instagram)
  const platforms: ('twitter' | 'instagram' | 'reddit')[] = ['twitter', 'instagram', 'reddit'];
  
  return Array.from({ length: 8 }).map((_, i) => {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    return {
      id: `social-${page}-${i}-${generateMockId()}`,
      type: 'social',
      title: `@user_${generateMockId().slice(0, 5)} on ${platform}`,
      description: `Just discovered something amazing about #${query}! The community feedback has been incredible. 🚀 #innovation #future`,
      imageUrl: `https://source.unsplash.com/featured/?social,${query}&sig=${i}`,
      url: '#',
      source: platform.charAt(0).toUpperCase() + platform.slice(1),
      publishedAt: new Date(Date.now() - i * 1800000).toISOString(),
      category: query as ContentCategory,
      isFavorite: false,
      tags: [query, platform],
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 500),
      author: `User_${generateMockId().slice(0, 5)}`,
    };
  });
};
