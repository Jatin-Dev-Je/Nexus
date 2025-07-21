import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, SearchFilters } from '@/types';

interface ContentState {
  feed: ContentItem[];
  favorites: ContentItem[];
  trending: ContentItem[];
  searchResults: ContentItem[];
  searchFilters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: ContentState = {
  feed: [],
  favorites: [],
  trending: [],
  searchResults: [],
  searchFilters: {
    query: '',
    type: 'all',
    category: '',
    sortBy: 'date',
  },
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.feed = action.payload;
    },
    addToFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.feed.push(...action.payload);
    },
    setTrending: (state, action: PayloadAction<ContentItem[]>) => {
      state.trending = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<ContentItem[]>) => {
      state.searchResults = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<ContentItem>) => {
      const item = { ...action.payload, isFavorite: true };
      const existingIndex = state.favorites.findIndex((fav) => fav.id === item.id);
      if (existingIndex === -1) {
        state.favorites.push(item);
      }
      // Update in feed as well
      const feedIndex = state.feed.findIndex((feedItem) => feedItem.id === item.id);
      if (feedIndex !== -1) {
        state.feed[feedIndex].isFavorite = true;
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
      // Update in feed as well
      const feedIndex = state.feed.findIndex((feedItem) => feedItem.id === action.payload);
      if (feedIndex !== -1) {
        state.feed[feedIndex].isFavorite = false;
      }
    },
    reorderFeed: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const [reorderedItem] = state.feed.splice(startIndex, 1);
      state.feed.splice(endIndex, 0, reorderedItem);
    },
    setSearchFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetSearch: (state) => {
      state.searchResults = [];
      state.searchFilters = initialState.searchFilters;
    },
  },
});

export const {
  setFeed,
  addToFeed,
  setTrending,
  setSearchResults,
  addToFavorites,
  removeFromFavorites,
  reorderFeed,
  setSearchFilters,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
  resetSearch,
} = contentSlice.actions;

export default contentSlice.reducer;
