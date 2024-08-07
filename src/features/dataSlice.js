import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileData: JSON.parse(localStorage.getItem("file")) || null,
  backupFileData: JSON.parse(localStorage.getItem("backupFile")) || null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    file: (state, action) => {
      localStorage.setItem("file", JSON.stringify(action.payload));
      state.fileData = action.payload;
    },
    backupFile: (state, action) => {
      localStorage.setItem("backupFile", JSON.stringify(action.payload));
      state.backupFileData = action.payload;
    },
  },
});

export const { file, backupFile } = dataSlice.actions;

export default dataSlice.reducer;
