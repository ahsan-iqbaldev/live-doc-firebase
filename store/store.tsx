import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import HomeSlice from "./Slices/homeSlice";

const reducers = combineReducers({
  home: HomeSlice,
});

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// export type RootState = ReturnType<typeof reducers>;

// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
