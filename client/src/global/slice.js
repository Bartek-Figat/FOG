import { createSlice } from '@reduxjs/toolkit';

const initialState = { githubIsLogin: false, user: null };

export const checkIsLogin = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    githubCheckIftLogin: (state) => {
      return state.githubIsLogin;
    },
    githuUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { githubCheckIftLogin, githuUser } = checkIsLogin.actions;
export default checkIsLogin.reducer;
