import { HolidayManagementDataType } from "@/types/holidayManagementType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface HolidayManagementStateType {
  holidayManagementData: HolidayManagementDataType[];
}
const initialState: HolidayManagementStateType = {
  holidayManagementData: [],
};
export const holidayManagementSLice = createSlice({
  name: "holidayManagement",
  initialState,
  reducers: {
    setHolidayManagementData: (state, action) => {
      state.holidayManagementData = action.payload;
    },
    addHolidayManagement: (
      state,
      action: PayloadAction<HolidayManagementDataType>
    ) => {
      state.holidayManagementData = [
        action.payload,
        ...state.holidayManagementData,
      ];
    },
    updateHolidayManagement: (
      state,
      action: PayloadAction<HolidayManagementDataType>
    ) => {
      state.holidayManagementData = state.holidayManagementData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeHolidayManagement: (
      state,
      action: PayloadAction<HolidayManagementDataType>
    ) => {
      state.holidayManagementData = state.holidayManagementData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setHolidayManagementData,
  addHolidayManagement,
  updateHolidayManagement,
  removeHolidayManagement,
} = holidayManagementSLice.actions;

export default holidayManagementSLice.reducer;
