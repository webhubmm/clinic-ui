import { BlogsDataType } from "@/types/blogsDataType";
import { ServicesDataType } from "@/types/servicesDataType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BranchesStateType {
  blogsData: BlogsDataType[];
  servicesListDataForBlogs: ServicesDataType[];
  isServicesListFetching: boolean;
}

const initialState: BranchesStateType = {
  blogsData: [],
  servicesListDataForBlogs: [],
  isServicesListFetching: false,
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogsData: (state, action) => {
      state.blogsData = action.payload;
    },
    setIsServicesListFetching: (state, action: PayloadAction<boolean>) => {
      state.isServicesListFetching = action.payload;
    },
    setServicesListDataForBlogs: (state, action) => {
      state.servicesListDataForBlogs = action.payload;
    },
    addBlogs: (state, action: PayloadAction<BlogsDataType>) => {
      state.blogsData = [action.payload, ...state.blogsData];
    },
    updateBlogs: (state, action: PayloadAction<BlogsDataType>) => {
      state.blogsData = state.blogsData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeBlogs: (state, action: PayloadAction<BlogsDataType>) => {
      state.blogsData = state.blogsData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setBlogsData,
  addBlogs,
  updateBlogs,
  removeBlogs,
  setIsServicesListFetching,
  setServicesListDataForBlogs,
} = blogsSlice.actions;
export default blogsSlice.reducer;
