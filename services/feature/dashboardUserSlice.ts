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
export default dashboardSlice.reducer;
