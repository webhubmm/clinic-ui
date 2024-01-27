import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  page:0,
  search:[],
};

const dashboardSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    setApiUserData: (state, { payload }) => {
      state.userList = payload;
    },
    setUserSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
});

export const { setApiUserData,setUserSearch } = dashboardSlice.actions;
// export const getAllProducts = (state) => state.dashboardReucer.userList;
export const getPageUserList = (state:any) => state.dashboardReucer.page;
// export const getSearchUserList = (state:any) => state.dashboardReucer?.search;

export default dashboardSlice.reducer;
