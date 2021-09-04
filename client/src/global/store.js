import { configureStore } from '@reduxjs/toolkit';
import ReduxLogger from 'redux-logger';
import githubIsLogin from './slice';
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    githubLogin: githubIsLogin,
  },
});
