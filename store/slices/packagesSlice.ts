import { PackagesDataType } from "@/types/packagesDataType";
import { ServicesDataType } from "@/types/servicesDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PackagesStateType {
  packagesData: PackagesDataType[];
  servicesDataForPackages: ServicesDataType[];
  isServiceFetching: boolean;
}

const initialState: PackagesStateType = {
  packagesData: [],
  servicesDataForPackages: [],
  isServiceFetching: false,
};

export const packagesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setPackagesData: (state, action) => {
      state.packagesData = action.payload;
    },
    setServicesDataForPackages: (state, action) => {
      state.servicesDataForPackages = action.payload;
    },
    setIsServiceFetching: (state, action: PayloadAction<boolean>) => {
      state.isServiceFetching = action.payload;
    },
  },
});

export const {
  setPackagesData,
  setServicesDataForPackages,
  setIsServiceFetching,
} = packagesSlice.actions;
export default packagesSlice.reducer;
