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
    addBranches: (state, action: PayloadAction<BranchesDataType>) => {
      state.branchesData = [...state.branchesData, action.payload];
    },
    updateBranches: (state, action: PayloadAction<BranchesDataType>) => {
      state.branchesData = state.branchesData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeBranches: (state, action: PayloadAction<BranchesDataType>) => {
      state.branchesData = state.branchesData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setBranchesData,
  setIsStaffFetching,
  setUserDataForBranches,
  addBranches,
  updateBranches,
  removeBranches,
} = branchesSlice.actions;
export default branchesSlice.reducer;
