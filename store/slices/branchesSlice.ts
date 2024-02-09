import { BranchesDataType } from "@/types/branchesDataType";
import { UserManagementType } from "@/types/userManagementType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BranchesStateType {
  branchesData: BranchesDataType[];
  userDataForBranches: UserManagementType[];
  isStaffFetching: boolean;
}

const initialState: BranchesStateType = {
  branchesData: [],
  userDataForBranches: [],
  isStaffFetching: false,
};

export const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setBranchesData: (state, action) => {
      state.branchesData = action.payload;
    },
    setIsStaffFetching: (state, action: PayloadAction<boolean>) => {
      state.isStaffFetching = action.payload;
    },
    setUserDataForBranches: (state, action) => {
      state.userDataForBranches = action.payload;
    },
  },
});

export const { setBranchesData, setIsStaffFetching, setUserDataForBranches } =
  branchesSlice.actions;
export default branchesSlice.reducer;
