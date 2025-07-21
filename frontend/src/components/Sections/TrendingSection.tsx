'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setTrending } from '@/store/slices/contentSlice';
import { addToast } from '@/store/slices/uiSlice';
import { transformNewsToContentItem, transformMovieToContentItem } from '@/utils/helpers';
import ContentGrid from '@/components/Content/ContentGrid';
import { ContentItem, NewsArticle, Movie } from '@/types';

// Mock trending data
const mockTrendingNews: { articles: NewsArticle[] } = {
  articles: [
    {
      id: 'trending-news-1',
      title: "🔥 AI Revolution: ChatGPT 5 Announced",
      description: "OpenAI unveils the next generation of AI with unprecedented capabilities that could change everything.",
      content: "Breaking news in artificial intelligence...",
      url: "https://example.com/ai-revolution",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      source: { id: "tech-news", name: "Tech News Daily" },
      author: "Sarah Tech",
      category: "technology"
    },
    {
      id: 'trending-news-2',
      title: "🚀 SpaceX Mars Mission Update",
      description: "Historic launch scheduled for next month as humanity prepares for interplanetary travel.",
      content: "Space exploration milestone...",
      url: "https://example.com/spacex-mars",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      source: { id: "space-news", name: "Space Explorer" },
      author: "Mike Cosmos",
      category: "science"
    },
    {
      id: 'trending-news-3',
      title: "💰 Crypto Market Surge",
      description: "Bitcoin reaches new all-time highs as institutional adoption accelerates globally.",
      content: "Financial markets analysis...",
      url: "https://example.com/crypto-surge",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      source: { id: "crypto-news", name: "Crypto Daily" },
      author: "Alex Finance",
      category: "business"
    }
  ]
};

const mockTrendingMovies: { results: Movie[] } = {
  results: [
    {
      id: 101,
      title: "Galactic Heroes",
      overview: "An epic space adventure that's breaking box office records worldwide with stunning visuals and incredible storytelling.",
      poster_path: "/placeholder-movie.svg",
      release_date: "2024-07-15",
      vote_average: 9.2,
      vote_count: 15000,
      genre_ids: [28, 12, 878],
      adult: false,
      backdrop_path: "/placeholder-movie.svg",
      original_language: "en",
      original_title: "Galactic Heroes",
      popularity: 999.5,
      video: false
    },
    {
      id: 102,
      title: "The Last Kingdom",
      overview: "A gripping historical drama that critics are calling the best film of the year with outstanding performances.",
      poster_path: "/placeholder-movie.svg",
      release_date: "2024-07-10",
      vote_average: 8.9,
      vote_count: 12000,
      genre_ids: [18, 36],
      adult: false,
      backdrop_path: "/placeholder-movie.svg",
      original_language: "en",
      original_title: "The Last Kingdom",
      popularity: 892.3,
      video: false
    },
    {
      id: 103,
      title: "Comedy Gold",
      overview: "The funniest movie of the summer that's making audiences laugh worldwide and trending on all social platforms.",
      poster_path: "/placeholder-movie.svg",
      release_date: "2024-07-08",
      vote_average: 8.1,
      vote_count: 8500,
      genre_ids: [35],
      adult: false,
      backdrop_path: "/placeholder-movie.svg",
      original_language: "en",
      original_title: "Comedy Gold",
      popularity: 756.8,
      video: false
    }
  ]
};

export default function TrendingSection() {
  const dispatch = useAppDispatch();
  const { trending } = useAppSelector((state) => state.content);
  const [mockLoading, setMockLoading] = useState(false);

  useEffect(() => {
    const loadTrendingContent = async () => {
      setMockLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const trendingContent: ContentItem[] = [];

      // Get top trending news
      const topNews = mockTrendingNews.articles.map(transformNewsToContentItem);
      trendingContent.push(...topNews);

      // Get top trending movies
      const topMovies = mockTrendingMovies.results.map(transformMovieToContentItem);
      trendingContent.push(...topMovies);

      // Sort by trending score (higher vote_average and popularity for movies, recent for news)
      const sortedTrending = trendingContent.sort((a, b) => {
        if (a.type === 'movie' && b.type === 'movie') {
          return (b.metadata?.vote_average || 0) - (a.metadata?.vote_average || 0);
        }
        if (a.type === 'news' && b.type === 'news') {
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
        }
        // Mix movies and news
        return Math.random() - 0.5;
      });
      
      dispatch(setTrending(sortedTrending));
      setMockLoading(false);
      
      // Add success toast
      dispatch(addToast({
        type: 'success',
        message: `Loaded ${sortedTrending.length} trending items`
      }));
    };

    if (trending.length === 0) {
      loadTrendingContent();
    }
  }, [dispatch, trending.length]);

  const topTrending = trending.slice(0, 3);
  const otherTrending = trending.slice(3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Updated every hour • {trending.length} items
        </div>
      </div>

      {/* Top trending items */}
      {topTrending.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            🔥 <span>Top Trending</span>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
              HOT
            </span>
          </h2>
          <ContentGrid 
            items={topTrending} 
            loading={mockLoading && trending.length === 0}
            columns={3}
          />
        </div>
      )}

      {/* Other trending items */}
      {otherTrending.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            📈 <span>Also Trending</span>
          </h2>
          <ContentGrid 
            items={otherTrending} 
            loading={false}
            columns={4}
          />
        </div>
      )}

      {mockLoading && trending.length === 0 && (
        <div className="flex justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <div className="text-gray-600 dark:text-gray-400">
              <p className="font-medium">Finding what's trending...</p>
              <p className="text-sm">Analyzing popular content</p>
            </div>
          </div>
        </div>
      )}

      {trending.length === 0 && !mockLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No trending content available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for trending content.
          </p>
        </div>
      )}
    </div>
  );
}
