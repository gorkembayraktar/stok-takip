import {  createSlice } from '@reduxjs/toolkit';

import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../utils/localstorage'

const initialState = {
   user: getLocalStorage('user', null),
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) =>{
      setLocalStorage('user', action.payload);
      console.log(action.payload, "stoage")
      state.user = action.payload;
    },
    logout: (state, action) => {
      removeLocalStorage('user');
      state.user = null;
    }
  },
});

export const { login, logout } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;