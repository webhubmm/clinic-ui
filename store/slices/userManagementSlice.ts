import { UserManagementType } from "@/types/userManagementType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersStateType {
  usersData: UserManagementType[];
}

const initialState: UsersStateType = {
  usersData: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },
    addUser: (state, action: PayloadAction<UserManagementType>) => {
      state.usersData = [...state.usersData, action.payload];
    },
    updateUser: (state, action: PayloadAction<UserManagementType>) => {
      state.usersData = state.usersData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeUser: (state, action: PayloadAction<UserManagementType>) => {
      state.usersData = state.usersData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setUsersData, addUser, removeUser, updateUser } =
  usersSlice.actions;
export default usersSlice.reducer;
