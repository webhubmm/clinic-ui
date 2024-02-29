import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";
import branchesSlice from "./slices/branchesSlice";
import servicesSlice from "./slices/servicesSlice";
import packagesSlice from "./slices/packagesSlice";
import doctorsSlice from "./slices/doctorsSlice";
import usersSlice from "./slices/userManagementSlice";
import teethSlice from "./slices/teethSlice";

// ...

export const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
    usersSlice: usersSlice,
    branchesSlice: branchesSlice,
    servicesSlice: servicesSlice,
    packagesSlice: packagesSlice,
    doctorsSlice: doctorsSlice,
    teethSlice: teethSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
