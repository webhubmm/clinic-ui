import { UserManagementType } from "@/types/userManagementType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CredientialType {
  trash: boolean | number;
  search: string;
  page: number;
  per_page: number;
}

interface GlobalState {
  isFetchLoading: boolean;
  init: boolean;
  userData: UserManagementType[];
  total_count: number;
  credential: CredientialType;
  createLoading: boolean;
  editLoading: boolean;
  restoreLoading: boolean;
  deleteLoading: boolean;
  error: Error | null;
}

const initialState: GlobalState = {
  isFetchLoading: false,
  init: false,
  userData: [],
  total_count: 0,
  credential: {
    trash: false,
    search: "",
    page: 1,
    per_page: 10,
  },
  createLoading: false,
  editLoading: false,
  restoreLoading: false,
  deleteLoading: false,
  error: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setFetchLoading: (state, action: PayloadAction<boolean>) => {
      state.isFetchLoading = action.payload;
    },
    setTotal_count: (state, action) => {
      state.total_count = action.payload;
    },
    setTrash: (state, action: PayloadAction<boolean>) => {
      state.credential.trash = action.payload;
    },
    setSearch: (state, action) => {
      state.credential.search = action.payload;
    },
    setPage: (state, action) => {
      state.credential.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.credential.per_page = action.payload;
    },
    setCreateLoading: (state, action: PayloadAction<boolean>) => {
      state.createLoading = action.payload;
    },
    setEditLoading: (state, action: PayloadAction<boolean>) => {
      state.editLoading = action.payload;
    },
    setRestoreLoading: (state, action: PayloadAction<boolean>) => {
      state.restoreLoading = action.payload;
    },
    setDeleteLoading: (state, action: PayloadAction<boolean>) => {
      state.deleteLoading = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setFetchLoading,
  setInit,
  setTotal_count,
  setTrash,
  setSearch,
  setCreateLoading,
  setEditLoading,
  setRestoreLoading,
  setDeleteLoading,
  setPage,
  setPerPage,
  setUserData,
} = globalSlice.actions;

export default globalSlice.reducer;
