import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/store/slices/userSlice';
import contentSlice from '@/store/slices/contentSlice';
import uiSlice from '@/store/slices/uiSlice';
import ContentCard from '@/components/Content/ContentCard';
import { ContentItem } from '@/types';

// Mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userSlice,
      content: contentSlice,
      ui: uiSlice,
    },
    preloadedState: initialState,
  });
};

const mockContentItem: ContentItem = {
  id: 'test-1',
  type: 'news',
  title: 'Test News Article',
  description: 'This is a test news article description',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  timestamp: '2023-12-01T12:00:00Z',
  category: 'technology',
  isFavorite: false,
  data: {
    id: 'test-1',
    title: 'Test News Article',
    description: 'This is a test news article description',
    content: 'Full article content',
    url: 'https://example.com/article',
    urlToImage: 'https://example.com/image.jpg',
    publishedAt: '2023-12-01T12:00:00Z',
    source: { id: 'test-source', name: 'Test Source' },
    author: 'Test Author',
    category: 'technology',
  },
};

describe('ContentCard', () => {
  it('renders content card with correct information', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockContentItem} index={0} />
      </Provider>
    );

    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    expect(screen.getByText(/This is a test news article/)).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('shows favorite button in correct state', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockContentItem} index={0} />
      </Provider>
    );

    const favoriteButton = screen.getByLabelText(/add to favorites/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('displays correct type badge', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockContentItem} index={0} />
      </Provider>
    );

    expect(screen.getByText('News')).toBeInTheDocument();
  });
});
