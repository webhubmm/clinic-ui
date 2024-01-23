import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

const dashboardSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    setApiUserData: (state, { payload }) => {
      state.userList = payload;
    },
  },
});

export const { setApiUserData } = dashboardSlice.actions;
// export const getAllProducts = (state) => state.dashboardReucer.userList;
export default dashboardSlice.reducer;
