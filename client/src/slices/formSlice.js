import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorState: false,
  error: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getError: (state, action) => {
      state.error = action.payload;
      state.errorState = true;
    },
    resetError: (state) => {
      state.errorState = false;
    },
  },
});

export const { getError, resetError } = formSlice.actions;

export default formSlice.reducer;
