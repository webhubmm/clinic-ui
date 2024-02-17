import { ServicesDataType } from "@/types/servicesDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ServicesStateType {
  servicesData: ServicesDataType[];
}

const initialState: ServicesStateType = {
  servicesData: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServicesData: (state, action) => {
      state.servicesData = action.payload;
    },
    addServices: (state, action: PayloadAction<ServicesDataType>) => {
      state.servicesData = [...state.servicesData, action.payload];
    },
    updateServices: (state, action: PayloadAction<ServicesDataType>) => {
      state.servicesData = state.servicesData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeServices: (state, action: PayloadAction<ServicesDataType>) => {
      state.servicesData = state.servicesData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setServicesData, addServices, updateServices, removeServices } =
  servicesSlice.actions;
export default servicesSlice.reducer;
