import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/dataSlice";
import actualInfoSlice from "../features/actualInfoSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    info: actualInfoSlice,
  },
});
