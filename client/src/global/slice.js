import { createSlice } from '@reduxjs/toolkit';

const initialState = { githubIsLogin: false };

export const checkIsLogin = createSlice({
  name: 'githubState',
  initialState,
  reducers: {
    githubCheckIfLogin: (state, action) => {
      state.githubIsLogin = false;
    },
    github: (state, action) => {
      state.githubIsLogin = true;
    },

    githubUser: (state, actions) => {
      state.githubIsLogin = actions.payload;
    },
  },
});

export const { githubCheckIfLogin, githubUser, github } = checkIsLogin.actions;
export default checkIsLogin.reducer;
