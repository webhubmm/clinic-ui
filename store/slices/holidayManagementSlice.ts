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
  },
});

export const { setHolidayManagementData } = holidayManagementSLice.actions;

export default holidayManagementSLice.reducer;
