import { createSlice } from "@reduxjs/toolkit";

// const initialState = { units: "tel aviv", key: 215793, country: "israel" };
const initialState = { celsius: true };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit(state) {
      //   const { city, Key } = action.payload;
      state.celsius = !state.celsius;
    },
  },
});
export const { toggleUnit } = settingsSlice.actions;

export default settingsSlice.reducer;
