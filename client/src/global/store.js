import { configureStore } from '@reduxjs/toolkit';
import githubIsLogin from './slice';
export const store = configureStore({
  reducer: {
    githubIsLogin,
  },
});
