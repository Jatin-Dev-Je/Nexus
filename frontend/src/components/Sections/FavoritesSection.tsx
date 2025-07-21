'use client';

import { useAppSelector } from '@/hooks/redux';
import ContentGrid from '@/components/Content/ContentGrid';

export default function FavoritesSection() {
  const { favorites } = useAppSelector((state) => state.content);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Favorites
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {favorites.length} items
        </div>
      </div>

      {favorites.length > 0 ? (
        <ContentGrid 
          items={favorites} 
          enableDragDrop={true}
          columns={3}
        />
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding content to your favorites by clicking the heart icon on any item.
          </p>
        </div>
      )}
    </div>
  );
}
