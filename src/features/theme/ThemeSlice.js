import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme'),
  default:'light',
  allow:['dark','light'],
  status: 'idle',
};

if(!initialState.theme || !initialState.allow.includes(initialState.theme) ) 
  initialState.theme = initialState.default;


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state,action) => {

      // içermiyorsa izin verme
      if(!state.allow.includes(action.payload)) return;

      localStorage.setItem('theme',action.payload)
      state.theme = action.payload;
    }
  },
});

export const { switchTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;