'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { addToFavorites, removeFromFavorites } from '@/store/slices/contentSlice';
import { ContentItem } from '@/types';
import { formatDate, truncateText, getImageWithFallback } from '@/utils/helpers';
import { motion } from 'framer-motion';
import { 
  FiHeart, 
  FiShare2, 
  FiExternalLink, 
  FiCalendar,
  FiUser,
  FiPlay,
  FiBookmark
} from 'react-icons/fi';

interface ContentCardProps {
  item: ContentItem;
  index: number;
  isDragging?: boolean;
}

export default function ContentCard({ item, index, isDragging = false }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isFavorite) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share && item.url) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: item.url,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(item.url || window.location.href);
    }
  };

  const handleCardClick = () => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const getActionButton = () => {
    switch (item.type) {
      case 'news':
        return (
          <button
            onClick={handleCardClick}
            className="flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiExternalLink className="w-4 h-4 mr-1" />
            Read More
          </button>
        );
      case 'movie':
        return (
          <button
            onClick={handleCardClick}
            className="flex items-center px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
          >
            <FiPlay className="w-4 h-4 mr-1" />
            Watch Now
          </button>
        );
      case 'social':
        return (
          <button
            onClick={handleCardClick}
            className="flex items-center px-3 py-1.5 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
          >
            <FiBookmark className="w-4 h-4 mr-1" />
            View Post
          </button>
        );
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'news':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'movie':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'social':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 
        overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer
        ${isDragging ? 'opacity-50 rotate-3 scale-105' : ''}
      `}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageError ? '/placeholder-image.jpg' : getImageWithFallback(item.imageUrl, '/placeholder-image.jpg')}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-colors
            ${item.isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }
          `}
          aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {truncateText(item.description, 120)}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <FiCalendar className="w-3 h-3 mr-1" />
            <span>{formatDate(item.timestamp)}</span>
          </div>
          
          {item.type === 'news' && (item.data as any).source && (
            <div className="flex items-center">
              <FiUser className="w-3 h-3 mr-1" />
              <span>{(item.data as any).source.name}</span>
            </div>
          )}

          {item.type === 'movie' && (
            <div className="flex items-center">
              <span>⭐ {((item.data as any).vote_average || 0).toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {getActionButton()}
          
          <button
            onClick={handleShare}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
