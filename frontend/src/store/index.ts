import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// import { contentApi } from './api/contentApi';
import userSlice from './slices/userSlice';
import contentSlice from './slices/contentSlice';
import uiSlice from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'content'], // Only persist user and content slices
};

const rootReducer = combineReducers({
  user: userSlice,
  content: contentSlice,
  ui: uiSlice,
  // [contentApi.reducerPath]: contentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    // }).concat(contentApi.middleware),
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
