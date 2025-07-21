'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setFeed, addToFeed } from '@/store/slices/contentSlice';
import { addToast } from '@/store/slices/uiSlice';
import { 
  transformNewsToContentItem, 
  transformMovieToContentItem, 
  transformSocialToContentItem 
} from '@/utils/helpers';
import ContentGrid from '@/components/Content/ContentGrid';
import { ContentItem, NewsArticle, Movie, SocialPost } from '@/types';

// Mock data for testing
const mockNewsData: { articles: NewsArticle[] } = {
  articles: [
    {
      id: 'news-1',
      title: "Breaking: AI Technology Advances",
      description: "Latest developments in artificial intelligence are reshaping the tech industry.",
      content: "Sample content...",
      url: "https://example.com/news/1",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date().toISOString(),
      source: { id: "demo", name: "Tech News" },
      author: "John Doe",
      category: "technology"
    },
    {
      id: 'news-2',
      title: "Market Update: Stocks Rise",
      description: "Financial markets show positive trends amid economic recovery.",
      content: "Market analysis...",
      url: "https://example.com/news/2", 
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { id: "demo", name: "Financial News" },
      author: "Jane Smith",
      category: "business"
    }
  ]
};

const mockMoviesData: { results: Movie[] } = {
  results: [
    {
      id: 1,
      title: "Epic Adventure",
      overview: "An incredible journey through unknown lands with amazing characters.",
      poster_path: "/placeholder-movie.svg",
      release_date: "2024-01-01",
      vote_average: 8.5,
      vote_count: 1000,
      genre_ids: [28, 12],
      adult: false,
      backdrop_path: "/placeholder-movie.svg",
      original_language: "en",
      original_title: "Epic Adventure",
      popularity: 100,
      video: false
    },
    {
      id: 2,
      title: "Romantic Comedy",
      overview: "A heartwarming story about love and laughter in the modern world.",
      poster_path: "/placeholder-movie.svg",
      release_date: "2024-02-01",
      vote_average: 7.8,
      vote_count: 800,
      genre_ids: [18, 10749],
      adult: false,
      backdrop_path: "/placeholder-movie.svg",
      original_language: "en",
      original_title: "Romantic Comedy",
      popularity: 80,
      video: false
    }
  ]
};

const mockSocialData: SocialPost[] = [
  {
    id: 1,
    title: "Exciting Day at the Office",
    body: "Just finished an amazing project with my team. Feeling grateful for great colleagues!",
    userId: 1,
    imageUrl: "/placeholder-social.svg",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    title: "Weekend Adventures",
    body: "Spent the weekend hiking in the mountains. Nature is the best therapy!",
    userId: 2,
    imageUrl: "/placeholder-social.svg",
    timestamp: new Date(Date.now() - 7200000).toISOString()
  }
];

export default function FeedSection() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mockLoading, setMockLoading] = useState(false);
  
  const feed = useAppSelector((state) => {
    const contentState = (state as { content?: { feed?: ContentItem[] } }).content;
    return contentState?.feed || [];
  }) as ContentItem[];

  useEffect(() => {
    // Simulate API calls with mock data
    const loadMockData = async () => {
      setMockLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const combinedContent: ContentItem[] = [];

      // Transform and combine news
      const newsItems = mockNewsData.articles.map(transformNewsToContentItem);
      combinedContent.push(...newsItems);

      // Transform and combine movies  
      const movieItems = mockMoviesData.results.slice(0, 2).map(transformMovieToContentItem);
      combinedContent.push(...movieItems);

      // Transform and combine social posts
      const socialItems = mockSocialData.map(transformSocialToContentItem);
      combinedContent.push(...socialItems);

      // Shuffle content for more realistic feed
      const shuffledContent = combinedContent.sort(() => Math.random() - 0.5);

      if (page === 1) {
        dispatch(setFeed(shuffledContent));
      } else {
        dispatch(addToFeed(shuffledContent));
      }

      setMockLoading(false);
      
      // Add success toast
      dispatch(addToast({
        type: 'success',
        message: `Loaded ${shuffledContent.length} new items`
      }));
    };

    loadMockData();
  }, [page, dispatch]);

  const loadMore = useCallback(() => {
    if (!mockLoading && hasMore) {
      setPage(prev => prev + 1);
      if (page >= 2) {
        setHasMore(false);
      }
    }
  }, [mockLoading, hasMore, page]);

  // Simple scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Feed
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {feed.length} items
        </div>
      </div>

      <ContentGrid items={feed} loading={mockLoading} />

      {mockLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading more content...</span>
          </div>
        </div>
      )}

      {!hasMore && feed.length > 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>🎉 You&apos;ve reached the end of your feed</p>
          <p className="text-sm mt-2">Check back later for more updates!</p>
        </div>
      )}

      {!mockLoading && feed.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No content available
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Try refreshing the page or check your internet connection
          </p>
        </div>
      )}
    </div>
  );
}
