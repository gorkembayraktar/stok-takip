import { configureStore } from '@reduxjs/toolkit';
import { themeReducer, GlobalSliceReducer } from '../features'
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    global: GlobalSliceReducer
  }
});

export default store;