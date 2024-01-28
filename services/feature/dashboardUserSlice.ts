import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  currentPage:1,
  search:[],
  trashList:false,
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
    setUserPage:(state,{payload}) =>{
      state.currentPage= payload
    },
      setUserTrashList:(state,{payload}) =>{
      state.trashList= payload
    }
  },
});

export const { setApiUserData,setUserSearch,setUserTrashList,setUserPage } = dashboardSlice.actions;
export const getPageUserList = (state:any) => state.dashboardReucer.page;

export default dashboardSlice.reducer;
