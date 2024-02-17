import { DoctorsDataType } from "@/types/doctorsDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DoctorsStateType {
  doctorsData: DoctorsDataType[];
  isFetchBranchesForDoctorsCpnLoading: boolean;
}

const initialState: DoctorsStateType = {
  doctorsData: [],
  isFetchBranchesForDoctorsCpnLoading: false,
};

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctorsData: (state, action) => {
      state.doctorsData = action.payload;
    },
    setFetchBranchesForDoctorsCpnLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isFetchBranchesForDoctorsCpnLoading = action.payload;
    },
    addDoctors: (state, action: PayloadAction<DoctorsDataType>) => {
      state.doctorsData = [...state.doctorsData, action.payload];
    },
    updateDoctors: (state, action: PayloadAction<DoctorsDataType>) => {
      state.doctorsData = state.doctorsData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeDoctors: (state, action: PayloadAction<DoctorsDataType>) => {
      state.doctorsData = state.doctorsData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setDoctorsData,
  addDoctors,
  updateDoctors,
  removeDoctors,
  setFetchBranchesForDoctorsCpnLoading,
} = doctorsSlice.actions;
export default doctorsSlice.reducer;
