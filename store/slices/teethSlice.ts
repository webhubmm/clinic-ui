import { TeethManagmentCreateType, TeethManagmentType } from "@/types/teethDataType";
import { createSlice } from "@reduxjs/toolkit";
interface TeethStateType  {
teethData:TeethManagmentType[];

}
const initialState: TeethStateType = {
  teethData: [],
};
export const teethSLice =createSlice({
    name:'teeth',
    initialState,
    reducers:{
        setTeethData :(state,action) =>{
            state.teethData =action.payload
        }
    }
});

export const {
    setTeethData
} =teethSLice.actions;

export default teethSLice.reducer;