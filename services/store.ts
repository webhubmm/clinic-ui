import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dashboardUserSlice from "./feature/dashboardUserSlice";

const rootReducer = combineReducers({
  dashboardData: dashboardUserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
