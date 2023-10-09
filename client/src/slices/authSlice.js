import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authFailed: null,
};

export const authSlice = createSlice({
  // String name to identify the slice
  name: 'auth',
  initialState,
  // One or more reducer function to define how the state can be upgraded
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setInvalidAuth: (state, action) => {
      state.authFailed = action.payload;
    },
  },
});

export const { setCredentials, logout, setInvalidAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
