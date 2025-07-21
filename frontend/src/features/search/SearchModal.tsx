'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useSearchNewsQuery, useSearchMoviesQuery } from '@/store/api/contentApi';
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
  
  const { searchModalOpen } = useAppSelector((state) => state.ui);
  const { searchResults } = useAppSelector((state) => state.content);
  
  const debouncedQuery = useDebounce(query, 300);

  const { data: newsResults, isLoading: newsLoading } = useSearchNewsQuery(
    { q: debouncedQuery },
    { skip: !debouncedQuery || activeFilter === 'movies' }
  );

  const { data: movieResults, isLoading: moviesLoading } = useSearchMoviesQuery(
    { q: debouncedQuery },
    { skip: !debouncedQuery || activeFilter === 'news' }
  );

  const isLoading = newsLoading || moviesLoading;

  useClickOutside(modalRef, () => {
    if (searchModalOpen) {
      handleClose();
    }
  });

  useEffect(() => {
    if (debouncedQuery && (newsResults || movieResults)) {
      const combinedResults = [];

      if (newsResults?.articles && activeFilter !== 'movies') {
        const newsItems = newsResults.articles.map(transformNewsToContentItem);
        combinedResults.push(...newsItems);
      }

      if (movieResults?.results && activeFilter !== 'news') {
        const movieItems = movieResults.results.map(transformMovieToContentItem);
        combinedResults.push(...movieItems);
      }

      dispatch(setSearchResults(combinedResults));
    } else {
      dispatch(setSearchResults([]));
    }
  }, [newsResults, movieResults, activeFilter, debouncedQuery, dispatch]);

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
                  Found {searchResults.length} results for "{query}"
                </div>
                <ContentGrid items={searchResults.slice(0, 12)} columns={3} />
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
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
