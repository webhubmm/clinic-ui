import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarStateType {
  date: any;
}
const initialState: CalendarStateType = {
  date: null,
};
export const calendarSLice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarData: (state, action) => {
      state.date = action.payload;
    },
    updateCalendarData: (state, action: PayloadAction<CalendarStateType>) => {
      state.date = state.date.map((item: any) =>
        item.date === action.payload.date ? action.payload : item
      );
    },
  },
});

export const { setCalendarData, updateCalendarData } = calendarSLice.actions;

export default calendarSLice.reducer;
