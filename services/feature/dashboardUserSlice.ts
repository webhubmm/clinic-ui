import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  page:1,
  per_page:10,
  search:'',
  trash:false,
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
      state.page= payload
    },
      setUserTrashList:(state,{payload}) =>{
      state.trash= payload
    }
  },
});

export const { setApiUserData,setUserSearch,setUserTrashList,setUserPage } = dashboardSlice.actions;
export const getPageUserList = (state:any) => state.dashboardReucer.page;

export default dashboardSlice.reducer;
