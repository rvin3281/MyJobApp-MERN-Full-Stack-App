import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../slices/dasboardSlice';
import formReducer from '../slices/formSlice';
import authReducer from '../slices/authSlice';
import sortReducer from '../slices/sortSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    form: formReducer,
    auth: authReducer,
    sort: sortReducer,
  },
});
