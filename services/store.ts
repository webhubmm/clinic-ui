import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dashboardUserSlice from "./feature/dashboardUserSlice";
// import { persistReducer } from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
const rootReducer =combineReducers({
   dashboardData:dashboardUserSlice
}) ;
// const persistedReducer = persistReducer(persistConfig, rootReducer) as typeof rootReducer;

export const store =configureStore({
 reducer:rootReducer,
 middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})

})