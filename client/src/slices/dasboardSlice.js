import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSidebar: false,
  isDarkTheme: localStorage.getItem('darkTheme') === 'true' ? true : false,
  isLoggedIn: false,
  user: [],
};

export const dashboardSlice = createSlice({
  // String name to identify the slice
  name: 'dashboard',
  initialState,
  // One or more reducer function to define how the state can be upgraded
  reducers: {
    toggleDarkTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // setJob: (state, action) => {
    //   state.jobs = action.payload;
    // },
    // resetJob: (state, action) => {
    //   state.jobs = null;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleDarkTheme,
  toggleSidebar,
  logoutUser,
  setUser,
  // setJob,
  // resetJob,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
