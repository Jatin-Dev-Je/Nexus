'use client';

import { useAppDispatch } from '@/hooks/redux';
import { reorderFeed } from '@/store/slices/contentSlice';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ContentCard from './ContentCard';
import { ContentItem } from '@/types';
import LoadingSpinner from '../UI/LoadingSpinner';

interface ContentGridProps {
  items: ContentItem[];
  loading?: boolean;
  enableDragDrop?: boolean;
  columns?: number;
}

export default function ContentGrid({ 
  items, 
  loading = false, 
  enableDragDrop = false,
  columns = 3 
}: ContentGridProps) {
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !enableDragDrop) return;

    const { source, destination } = result;

    if (source.index !== destination.index) {
      dispatch(reorderFeed({
        startIndex: source.index,
        endIndex: destination.index,
      }));
    }
  };

  const getGridColumns = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-2xl">📰</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No content available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for new content or adjust your preferences.
        </p>
      </div>
    );
  }

  if (enableDragDrop) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content-grid">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`grid gap-6 ${getGridColumns()}`}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContentCard
                        item={item}
                        index={index}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return (
    <div className={`grid gap-6 ${getGridColumns()}`}>
      {items.map((item, index) => (
        <ContentCard
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
}
