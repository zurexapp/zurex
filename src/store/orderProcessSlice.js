import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orderProcessName: '',
  enableCardData: false,
  curentOrderProductData: {},
};

export const orderProcessSlice = createSlice({
  name: 'orderProcess',
  initialState,
  reducers: {
    setOrderProcessName: (state, action) => {
      if (
        action.payload.orderProcessName === null ||
        action.payload.orderProcessName === undefined ||
        action.payload.orderProcessName?.length <= 0
      ) {
        state.orderProcessName = '';
      } else {
        state.orderProcessName = action.payload.orderProcessName;
      }
    },
    setCurentOrderProductData: (state, action) => {
      if (
        action.payload.curentOrderProductData === null ||
        action.payload.curentOrderProductData === undefined ||
        action.payload.curentOrderProductData?.length <= 0
      ) {
        state.curentOrderProductData = {};
      } else {
        state.curentOrderProductData = action.payload.curentOrderProductData;
      }
    },
    setEnableCardData: (state, action) => {
      if (
        action.payload.enableCardData === null ||
        action.payload.enableCardData === undefined ||
        action.payload.enableCardData?.length <= 0
      ) {
        state.enableCardData = false;
      } else {
        state.enableCardData = action.payload.enableCardData;
      }
    },
  },
});

export const {
  setOrderProcessName,
  setEnableCardData,
  setCurentOrderProductData,
} = orderProcessSlice.actions;

export default orderProcessSlice.reducer;
