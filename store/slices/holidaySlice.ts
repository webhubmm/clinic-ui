import { HolidayManagmentType } from "@/types/holidayDataType";
import { createSlice } from "@reduxjs/toolkit";
interface HolidayStateType  {
holidayData:HolidayManagmentType[];

}
const initialState: HolidayStateType = {
  holidayData: [],
};
export const holidaySLice =createSlice({
    name:'holiday',
    initialState,
    reducers:{
        setHolidayData :(state,action) =>{
            state.holidayData =action.payload
        }
    }
});

export const {
    setHolidayData
} =holidaySLice.actions;

export default holidaySLice.reducer;