import { DoctorsDataType } from "@/types/doctorsDataType";
import { createSlice } from "@reduxjs/toolkit";

interface DoctorsStateType {
  doctorsData: DoctorsDataType[];
}

const initialState: DoctorsStateType = {
  doctorsData: [],
};

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctorsData: (state, action) => {
      state.doctorsData = action.payload;
    },
  },
});

export const { setDoctorsData } = doctorsSlice.actions;
export default doctorsSlice.reducer;
