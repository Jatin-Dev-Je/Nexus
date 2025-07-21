import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  activeSection: 'feed' | 'trending' | 'favorites' | 'settings';
  settingsModalOpen: boolean;
  searchModalOpen: boolean;
  loading: {
    feed: boolean;
    trending: boolean;
    favorites: boolean;
    search: boolean;
  };
  toasts: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }[];
}

const initialState: UIState = {
  sidebarOpen: true,
  activeSection: 'feed',
  settingsModalOpen: false,
  searchModalOpen: false,
  loading: {
    feed: false,
    trending: false,
    favorites: false,
    search: false,
  },
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<UIState['activeSection']>) => {
      state.activeSection = action.payload;
    },
    openSettingsModal: (state) => {
      state.settingsModalOpen = true;
    },
    closeSettingsModal: (state) => {
      state.settingsModalOpen = false;
    },
    openSearchModal: (state) => {
      state.searchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.searchModalOpen = false;
    },
    setLoading: (state, action: PayloadAction<{ section: keyof UIState['loading']; loading: boolean }>) => {
      state.loading[action.payload.section] = action.payload.loading;
    },
    addToast: (state, action: PayloadAction<Omit<UIState['toasts'][0], 'id'>>) => {
      const toast = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setActiveSection,
  openSettingsModal,
  closeSettingsModal,
  openSearchModal,
  closeSearchModal,
  setLoading,
  addToast,
  removeToast,
  clearToasts,
} = uiSlice.actions;

export default uiSlice.reducer;
