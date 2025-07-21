'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleSidebar, setActiveSection } from '@/store/slices/uiSlice';
import { toggleDarkMode } from '@/store/slices/userSlice';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiTrendingUp, 
  FiHeart, 
  FiSettings, 
  FiSearch,
  FiMenu,
  FiMoon,
  FiSun,
  FiBell
} from 'react-icons/fi';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarOpen, activeSection } = useAppSelector((state) => state.ui);
  const { darkMode } = useAppSelector((state) => state.user.preferences);

  const menuItems = [
    { id: 'feed', label: 'Feed', icon: FiHome },
    { id: 'trending', label: 'Trending', icon: FiTrendingUp },
    { id: 'favorites', label: 'Favorites', icon: FiHeart },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const handleMenuClick = (section: typeof activeSection) => {
    dispatch(setActiveSection(section));
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700 z-50
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Nexus
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id as typeof activeSection)}
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <FiSun className="w-5 h-5 mr-3" /> : <FiMoon className="w-5 h-5 mr-3" />}
              <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
