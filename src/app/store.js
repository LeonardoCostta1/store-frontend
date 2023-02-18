import { configureStore } from '@reduxjs/toolkit';
import LoadingSlice from '../features/loading/LoadingSlice';
import AuthSlice from '../features/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    loading:LoadingSlice,
    auth:AuthSlice,
  },
});
