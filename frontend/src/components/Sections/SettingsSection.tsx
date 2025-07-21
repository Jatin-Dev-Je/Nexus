'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setPreferences, addCategory, removeCategory } from '@/store/slices/userSlice';
import { CATEGORIES } from '@/utils/helpers';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiX } from 'react-icons/fi';

export default function SettingsSection() {
  const dispatch = useAppDispatch();
  const { preferences } = useAppSelector((state) => state.user);
  const [newCategory, setNewCategory] = useState('');

  const handleToggleCategory = (category: string) => {
    if (preferences.categories.includes(category)) {
      dispatch(removeCategory(category));
    } else {
      dispatch(addCategory(category));
    }
  };

  const handleAddCustomCategory = () => {
    if (newCategory.trim() && !preferences.categories.includes(newCategory.trim())) {
      dispatch(addCategory(newCategory.trim()));
      setNewCategory('');
    }
  };

  const handleLanguageChange = (language: string) => {
    dispatch(setPreferences({ language }));
  };

  const handleNotificationToggle = () => {
    dispatch(setPreferences({ notifications: !preferences.notifications }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Content Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Preferences
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Favorite Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleToggleCategory(category)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${preferences.categories.includes(category)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Categories
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add custom category"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomCategory()}
                />
                <button
                  onClick={handleAddCustomCategory}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Display custom categories */}
              <div className="flex flex-wrap gap-2">
                {preferences.categories
                  .filter(cat => !CATEGORIES.includes(cat))
                  .map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => dispatch(removeCategory(category))}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            App Preferences
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Push Notifications
              </label>
              <button
                onClick={handleNotificationToggle}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${preferences.notifications ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <FiSave className="w-4 h-4 mr-2" />
                Save Preferences
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Account Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Account
        </h2>
        
        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Export Data
          </button>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Clear All Data
          </button>
        </div>
      </motion.div>
    </div>
  );
}
