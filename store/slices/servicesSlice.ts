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
  },
});

export const { setServicesData } = servicesSlice.actions;
export default servicesSlice.reducer;
