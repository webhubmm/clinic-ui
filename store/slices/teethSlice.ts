import { TeethDataType } from "@/types/teethDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface TeethStateType {
  teethData: TeethDataType[];
}
const initialState: TeethStateType = {
  teethData: [],
};
export const teethSLice = createSlice({
  name: "teeth",
  initialState,
  reducers: {
    setTeethData: (state, action) => {
      state.teethData = action.payload;
    },
    addTeeth: (state, action: PayloadAction<TeethDataType>) => {
      state.teethData = [action.payload, ...state.teethData];
    },
    updateTeeth: (state, action: PayloadAction<TeethDataType>) => {
      state.teethData = state.teethData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTeeth: (state, action: PayloadAction<TeethDataType>) => {
      state.teethData = state.teethData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setTeethData, addTeeth, updateTeeth, removeTeeth } =
  teethSLice.actions;

export default teethSLice.reducer;
