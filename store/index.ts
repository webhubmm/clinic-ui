import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";
import branchesSlice from "./slices/branchesSlice";
import servicesSlice from "./slices/servicesSlice";

// ...

export const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
    branchesSlice: branchesSlice,
    servicesSlice: servicesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
