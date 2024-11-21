import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filtersData: [],
  oilCompaniesData: [],
  oilsData: [],
  tireCompaniesData: [],
  tireData: [],
  engineOilData: [],
  engineOilPetrolData: [],
  batteryData: [],
  batteryCompaniesData: [],
  myOrdersData: [],
  supportServicesData: [],
  mySupportServicesData: [],
  mySupportServicesItems: [],
  clientCarsData: [],
  mobileClientsBanner: [],
  adminCarsData: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setEngineOilData: (state, action) => {
      if (action.payload.engineOilData === null) {
        state.engineOilData = [];
      } else {
        state.engineOilData = action.payload.engineOilData;
      }
    },
    setEngineOilPetrolData: (state, action) => {
      if (action.payload.engineOilPetrolData === null) {
        state.engineOilPetrolData = [];
      } else {
        state.engineOilPetrolData = action.payload.engineOilPetrolData;
      }
    },
    setAdminCarsData: (state, action) => {
      if (action.payload.adminCarsData === null) {
        state.adminCarsData = [];
      } else {
        state.adminCarsData = action.payload.adminCarsData;
      }
    },
    setFiltersDta: (state, action) => {
      if (action.payload.filtersData === null) {
        state.filtersData = [];
      } else {
        state.filtersData = action.payload.filtersData;
      }
    },
    setOilCompaniesData: (state, action) => {
      if (action.payload.oilCompaniesData === null) {
        state.oilCompaniesData = [];
      } else {
        state.oilCompaniesData = action.payload.oilCompaniesData;
      }
    },
    setOilsData: (state, action) => {
      if (action.payload.oilsData === null) {
        state.oilsData = [];
      } else {
        state.oilsData = action.payload.oilsData;
      }
    },
    setTireCompaniesData: (state, action) => {
      if (action.payload.tireCompaniesData === null) {
        state.tireCompaniesData = [];
      } else {
        state.tireCompaniesData = action.payload.tireCompaniesData;
      }
    },
    setTireData: (state, action) => {
      if (action.payload.tireData === null) {
        state.tireData = [];
      } else {
        state.tireData = action.payload.tireData;
      }
    },
    setBatteryData: (state, action) => {
      if (action.payload.batteryData === null) {
        state.batteryData = [];
      } else {
        state.batteryData = action.payload.batteryData;
      }
    },
    setBatteryCompaniesData: (state, action) => {
      if (action.payload.batteryCompaniesData === null) {
        state.batteryCompaniesData = [];
      } else {
        state.batteryCompaniesData = action.payload.batteryCompaniesData;
      }
    },
    setMyOrdersData: (state, action) => {
      if (action.payload.myOrdersData === null) {
        state.myOrdersData = [];
      } else {
        state.myOrdersData = action.payload.myOrdersData;
      }
    },
    setSupportServicesData: (state, action) => {
      if (action.payload.supportServicesData === null) {
        state.supportServicesData = [];
      } else {
        state.supportServicesData = action.payload.supportServicesData;
      }
    },
    setMySupportServicesData: (state, action) => {
      if (action.payload.mySupportServicesData === null) {
        state.mySupportServicesData = [];
      } else {
        state.mySupportServicesData = action.payload.mySupportServicesData;
      }
    },
    setMySupportServicesItems: (state, action) => {
      if (action.payload.mySupportServicesItems === null) {
        state.mySupportServicesItems = [];
      } else {
        state.mySupportServicesItems = action.payload.mySupportServicesItems;
      }
    },
    setClientCarsData: (state, action) => {
      if (action.payload.clientCarsData === null) {
        state.clientCarsData = [];
      } else {
        state.clientCarsData = action.payload.clientCarsData;
      }
    },
    setMobileClientsBanner: (state, action) => {
      if (action.payload.mobileClientsBanner === null) {
        state.mobileClientsBanner = [];
      } else {
        state.mobileClientsBanner = action.payload.mobileClientsBanner;
      }
    },
  },
});

export const {
  setBatteryData,
  setFiltersDta,
  setOilCompaniesData,
  setOilsData,
  setTireCompaniesData,
  setTireData,
  setBatteryCompaniesData,
  setMyOrdersData,
  setSupportServicesData,
  setMySupportServicesData,
  setMySupportServicesItems,
  setClientCarsData,
  setMobileClientsBanner,
  setAdminCarsData,
  setEngineOilData,
  setEngineOilPetrolData,
} = projectSlice.actions;

export default projectSlice.reducer;
