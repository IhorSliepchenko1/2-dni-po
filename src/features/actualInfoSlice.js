import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: JSON.parse(localStorage.getItem(`info`)) || {
    city: null,
    location: null,
    first: null,
    second: null,
    third: null,
    first_count: null,
    second_count: null,
    third_count: null,
    present: null,
    project: null,
    landmarks: null,
    team: null,
    date: null,
  },
};

export const actualInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    actualInfo: (state, action) => {
      localStorage.setItem(`info`, JSON.stringify(action.payload));
      state.info = action.payload;
    },

    actualInfoDelete: (state) => {
      localStorage.setItem(`info`, JSON.stringify({}));
      state.info = {
        city: null,
        location: null,
        first: null,
        second: null,
        third: null,
        first_count: null,
        second_count: null,
        third_count: null,
        present: null,
        project: null,
        landmarks: null,
        team: null,
        date: null,
      };
    },
  },
});

export const { actualInfo, actualInfoDelete } = actualInfoSlice.actions;

export default actualInfoSlice.reducer;
