import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '@/types';

interface UserState {
  preferences: UserPreferences;
  isAuthenticated: boolean;
  profile: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

const initialState: UserState = {
  preferences: {
    categories: ['general', 'technology', 'business'],
    darkMode: false,
    language: 'en',
    notifications: true,
  },
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    toggleDarkMode: (state) => {
      state.preferences.darkMode = !state.preferences.darkMode;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.preferences.categories.includes(action.payload)) {
        state.preferences.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.preferences.categories = state.preferences.categories.filter(
        (category) => category !== action.payload
      );
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserState['profile']>) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    },
  },
});

export const {
  setPreferences,
  toggleDarkMode,
  addCategory,
  removeCategory,
  setAuthenticated,
  setProfile,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
