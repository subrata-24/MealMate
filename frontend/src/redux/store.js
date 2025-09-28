import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ownerSlice from "./ownerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
