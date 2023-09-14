import { configureStore } from '@reduxjs/toolkit';
import { themeReducer, GlobalSliceReducer, AuthReducer } from '../features'
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    global: GlobalSliceReducer,
    auth: AuthReducer
  }
});

export default store;