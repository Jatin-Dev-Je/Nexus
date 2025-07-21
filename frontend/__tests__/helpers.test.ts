import { 
  formatDate, 
  truncateText, 
  transformNewsToContentItem,
  transformMovieToContentItem,
  CATEGORIES 
} from '@/utils/helpers';
import { NewsArticle, Movie } from '@/types';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('formats recent dates correctly', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      expect(formatDate(oneHourAgo.toISOString())).toBe('1h ago');
    });

    it('handles invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('Unknown date');
    });
  });

  describe('truncateText', () => {
    it('truncates long text correctly', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncateText(longText, 20);
      
      expect(result).toBe('This is a very long...');
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
    });

    it('does not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateText(shortText, 20);
      
      expect(result).toBe(shortText);
    });
  });

  describe('transformNewsToContentItem', () => {
    it('transforms news article correctly', () => {
      const newsArticle: NewsArticle = {
        id: 'test-1',
        title: 'Test Article',
        description: 'Test description',
        content: 'Test content',
        url: 'https://example.com',
        urlToImage: 'https://example.com/image.jpg',
        publishedAt: '2023-12-01T12:00:00Z',
        source: { id: 'test', name: 'Test Source' },
        author: 'Test Author',
        category: 'technology',
      };

      const result = transformNewsToContentItem(newsArticle);

      expect(result.type).toBe('news');
      expect(result.title).toBe('Test Article');
      expect(result.description).toBe('Test description');
      expect(result.url).toBe('https://example.com');
    });
  });

  describe('transformMovieToContentItem', () => {
    it('transforms movie correctly', () => {
      const movie: Movie = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test overview',
        poster_path: '/test-poster.jpg',
        backdrop_path: '/test-backdrop.jpg',
        release_date: '2023-12-01',
        vote_average: 8.5,
        vote_count: 1000,
        genre_ids: [1, 2, 3],
        adult: false,
        original_language: 'en',
        original_title: 'Test Movie',
        popularity: 100,
        video: false,
      };

      const result = transformMovieToContentItem(movie);

      expect(result.type).toBe('movie');
      expect(result.title).toBe('Test Movie');
      expect(result.description).toBe('Test overview');
      expect(result.imageUrl).toContain('https://image.tmdb.org');
    });
  });

  describe('CATEGORIES', () => {
    it('contains expected categories', () => {
      expect(CATEGORIES).toContain('technology');
      expect(CATEGORIES).toContain('business');
      expect(CATEGORIES).toContain('entertainment');
      expect(CATEGORIES.length).toBeGreaterThan(0);
    });
  });
});
