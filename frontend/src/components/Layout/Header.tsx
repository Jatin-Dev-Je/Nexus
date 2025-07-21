'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useDebounce } from '@/hooks';
import { toggleSidebar, openSearchModal } from '@/store/slices/uiSlice';
import { setSearchFilters } from '@/store/slices/contentSlice';
import { motion } from 'framer-motion';
import { 
  FiMenu, 
  FiSearch, 
  FiBell, 
  FiUser,
  FiSettings
} from 'react-icons/fi';

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { profile, isAuthenticated } = useAppSelector((state) => state.user);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (debouncedSearchQuery) {
      dispatch(setSearchFilters({ query: debouncedSearchQuery }));
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="
                block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                placeholder-gray-500 dark:placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                sm:w-64 md:w-80
              "
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiSettings className="w-5 h-5" />
          </button>

          {/* User profile */}
          <div className="relative">
            {isAuthenticated && profile ? (
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-gray-900 dark:text-white font-medium hidden sm:block">
                  {profile.name}
                </span>
              </button>
            ) : (
              <button className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiUser className="w-5 h-5" />
                <span className="text-gray-900 dark:text-white font-medium hidden sm:block">
                  Sign In
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
