import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: '',
  jobs: '',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,

  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setJob: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { setSort, setJob } = sortSlice.actions;

export default sortSlice.reducer;
