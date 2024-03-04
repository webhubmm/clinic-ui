import { FAQSDataType } from "@/types/faqsDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface FAQSStateType {
  faqsData: FAQSDataType[];
}
const initialState: FAQSStateType = {
  faqsData: [],
};
export const faqsSLice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFAQSData: (state, action) => {
      state.faqsData = action.payload;
    },
    addFAQS: (state, action: PayloadAction<FAQSDataType>) => {
      state.faqsData = [action.payload, ...state.faqsData];
    },
    updateFAQS: (state, action: PayloadAction<FAQSDataType>) => {
      state.faqsData = state.faqsData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeFAQS: (state, action: PayloadAction<FAQSDataType>) => {
      state.faqsData = state.faqsData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setFAQSData, addFAQS, updateFAQS, removeFAQS } =
  faqsSLice.actions;

export default faqsSLice.reducer;
