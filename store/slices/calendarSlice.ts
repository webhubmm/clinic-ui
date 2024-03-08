import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarStateType {
  date: any | [];
}
const initialState: CalendarStateType = {
  date: [],
};
export const calendarSLice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarData: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setCalendarData } = calendarSLice.actions;

export default calendarSLice.reducer;
