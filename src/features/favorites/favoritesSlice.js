import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../app/utils/apiCalls";
// use this to see mockdata when out of limit use from api
// import {
//   mockDatacurrent1,
//   mockDatacurrent2,
//   mockDatacurrent3,
//   mockDatacurrent4,
// } from "./utils/mockDataCurrentforcast";

const initialState = {
  favoritesList: [{ city: "tel aviv", key: "215793", country: "israel" }],
  currentForecastArray: [],
  // use this to see mockdata when out of limit use from api
  // currentForecastArray: [
  //   mockDatacurrent1,
  //   mockDatacurrent2,
  //   mockDatacurrent3,
  //   mockDatacurrent4,
  // ],
  status: "idle",
  error: null,
};

export const fetchCurrentconditionsArray = createAsyncThunk(
  "currentDayForecast/fetchCurrentForecast",
  async (key, { getState }) => {
    const urlPeriod = `currentconditions/v1`;

    const responseData = await apiCall(
      urlPeriod,
      null,
      "currentconditions",
      null,
      key
    );
    return responseData;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favoriteAdded(state, action) {
      // state.push(action.payload);
      state.favoritesList.push(action.payload);
    },
    favoriteDeleted(state, action) {
      const key = action.payload;
      const index = state.favoritesList.findIndex((object) => {
        return object.key === key;
      });
      state.favoritesList.splice(index, 1);
    },
    clearCurrentForecastArray(state, action) {
      state.currentForecastArray = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentconditionsArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentconditionsArray.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.currentForecastArray = state.currentForecastArray.concat(
          action.payload
        );
      })

      .addCase(fetchCurrentconditionsArray.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { favoriteAdded, favoriteDeleted, clearCurrentForecastArray } =
  favoritesSlice.actions;
export const selectAllfavorites = (state) => state.favorites.favoritesList;
export const selectfavoriteByKey = (state, favoriteKey) =>
  state.favorites.favoritesList.find(
    (favorite) => favorite.key === favoriteKey
  );
export default favoritesSlice.reducer;
