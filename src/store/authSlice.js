import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: null,
  isArabicLanguage: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (
        action.payload.isAuth === null ||
        action.payload.isAuth === undefined
      ) {
        state.isAuth = null;
      } else {
        state.isAuth = action.payload.isAuth;
      }
    },
    setIsArabicLanguage: (state, action) => {
      if (
        action.payload.isArabicLanguage === null ||
        action.payload.isArabicLanguage === undefined
      ) {
        state.isArabicLanguage = false;
      } else {
        state.isArabicLanguage = action.payload.isArabicLanguage;
      }
    },
  },
});

export const {setAuth, setIsArabicLanguage} = authSlice.actions;

export default authSlice.reducer;
