'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSearchResults, resetSearch } from '@/store/slices/contentSlice';
import { closeSearchModal } from '@/store/slices/uiSlice';
import { useDebounce, useClickOutside } from '@/hooks';
import { transformNewsToContentItem, transformMovieToContentItem } from '@/utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import ContentGrid from '@/components/Content/ContentGrid';
import { useRef } from 'react';

export default function SearchModal() {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'movies'>('all');
  const [isLoading, setIsLoading] = useState(false);
  
  const { searchModalOpen } = useAppSelector((state) => state.ui);
  const { searchResults } = useAppSelector((state) => state.content);
  
  const debouncedQuery = useDebounce(query, 300);

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => {
    if (searchModalOpen) {
      handleClose();
    }
  });

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      
      // Mock search with delay
      const searchWithMockData = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const combinedResults = [];

        if (activeFilter !== 'movies') {
          // Mock news search results
          const mockNewsResults = [{
            id: `search-news-${Date.now()}`,
            title: `News about ${debouncedQuery}`,
            description: `Latest news and updates about ${debouncedQuery}`,
            content: `Detailed content about ${debouncedQuery}...`,
            url: `https://example.com/news/${debouncedQuery}`,
            urlToImage: 'https://picsum.photos/400/200',
            publishedAt: new Date().toISOString(),
            source: { id: 'search-source', name: 'Search News' },
            author: 'News Reporter',
            category: 'general',
          }];
          
          const newsItems = mockNewsResults.map(transformNewsToContentItem);
          combinedResults.push(...newsItems);
        }
        if (activeFilter !== 'news') {
          // Mock movie search results
          const mockMovieResults = [{
            id: Date.now(),
            title: `${debouncedQuery} Movie`,
            overview: `A movie about ${debouncedQuery}`,
            poster_path: '/placeholder-movie.jpg',
            backdrop_path: '/placeholder-backdrop.jpg',
            release_date: '2023-01-01',
            vote_average: 7.5,
            vote_count: 1000,
            popularity: 50.0,
            adult: false,
            genre_ids: [28, 12],
            original_language: 'en',
            original_title: `${debouncedQuery} Movie`,
            video: false,
          }];
          
          const movieItems = mockMovieResults.map(transformMovieToContentItem);
          combinedResults.push(...movieItems);
        }

        dispatch(setSearchResults(combinedResults));
        setIsLoading(false);
      };
      
      searchWithMockData();
    } else {
      dispatch(setSearchResults([]));
      setIsLoading(false);
    }
  }, [activeFilter, debouncedQuery, dispatch]);

  const handleClose = () => {
    dispatch(closeSearchModal());
    dispatch(resetSearch());
    setQuery('');
    setActiveFilter('all');
  };

  const handleFilterChange = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
  };

  if (!searchModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Search Content
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Search input */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for news, movies, or content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
                  block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                "
                autoFocus
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Filter by:</span>
              {['all', 'news', 'movies'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter as typeof activeFilter)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${activeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="p-6 overflow-y-auto max-h-96">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-600 dark:text-gray-400">Searching...</div>
              </div>
            ) : query && searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Found {searchResults.length} results for &quot;{query}&quot;
                </div>
                <ContentGrid items={searchResults.slice(0, 12)} columns={3} />
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">
                  No results found for &quot;{query}&quot;
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">
                  Start typing to search for content...
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
