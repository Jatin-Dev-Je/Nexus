export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  category: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface SocialPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  author?: string;
  timestamp?: string;
  likes?: number;
  comments?: number;
  imageUrl?: string;
}

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  timestamp: string;
  category: string;
  isFavorite: boolean;
  data: NewsArticle | Movie | SocialPost;
}

export interface UserPreferences {
  categories: string[];
  darkMode: boolean;
  language: string;
  notifications: boolean;
}

export interface SearchFilters {
  query: string;
  type: 'all' | 'news' | 'movies' | 'social';
  category: string;
  sortBy: 'date' | 'relevance' | 'popularity';
}

export interface ApiResponse<T> {
  data: T;
  status: string;
  totalResults?: number;
  page?: number;
  totalPages?: number;
}

export interface DragItem {
  id: string;
  index: number;
  type: string;
}
