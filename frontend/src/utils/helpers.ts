import { NewsArticle, Movie, SocialPost, ContentItem } from '@/types';

export function transformNewsToContentItem(article: NewsArticle): ContentItem {
  return {
    id: `news-${article.url}`,
    type: 'news',
    title: article.title,
    description: article.description || '',
    imageUrl: article.urlToImage || '/placeholder-news.svg',
    url: article.url,
    timestamp: article.publishedAt,
    category: 'news',
    isFavorite: false,
    data: article,
  };
}

export function transformMovieToContentItem(movie: Movie): ContentItem {
  return {
    id: `movie-${movie.id}`,
    type: 'movie',
    title: movie.title,
    description: movie.overview,
    imageUrl: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/placeholder-movie.svg',
    timestamp: movie.release_date,
    category: 'entertainment',
    isFavorite: false,
    data: movie,
  };
}

export function transformSocialToContentItem(post: SocialPost): ContentItem {
  // Ensure unique IDs by adding timestamp for duplicate posts
  const uniqueId = `social-${post.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: uniqueId,
    type: 'social',
    title: post.title,
    description: post.body,
    imageUrl: post.imageUrl || '/placeholder-social.svg',
    timestamp: post.timestamp || new Date().toISOString(),
    category: 'social',
    isFavorite: false,
    data: post,
  };
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return 'Unknown date';
    }
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch {
    return 'Unknown date';
  }
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const CATEGORIES = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

export const MOVIE_CATEGORIES = [
  'popular',
  'top_rated',
  'upcoming',
  'now_playing',
];

export function getImageWithFallback(imageUrl: string, fallback: string): string {
  return imageUrl && imageUrl !== 'null' ? imageUrl : fallback;
}
