'use client';

import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import postsReducer from './postSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    posts: postsReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
