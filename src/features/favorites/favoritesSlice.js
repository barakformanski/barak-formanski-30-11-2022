import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../app/utils/apiCalls";

const initialState = {
  favoritesList: [{ city: "tel aviv", key: "215793", country: "israel" }],
  currentForecastArray: [],
  status: "idle",
  error: null,
};

export const fetchCurrentconditionsArray = createAsyncThunk(
  "currentDayForecast/fetchCurrentForecast",
  async (key, { getState }) => {
    const state = await getState();

    console.log("arg", key);

    // console.log("state.favorites", state.favorites);
    // const key = state.favorites.favoritesList[0].key;
    //   console.log("key", key);
    const urlPeriod = `currentconditions/v1/${key}`;
    const responseData = await apiCall(
      urlPeriod,
      null,
      "currentconditions",
      null
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentconditionsArray.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentconditionsArray.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action.payload", action.payload);
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
export const { favoriteAdded, favoriteDeleted } = favoritesSlice.actions;
export const selectAllfavorites = (state) => state.favorites.favoritesList;
export const selectfavoriteByKey = (state, favoriteKey) =>
  state.favorites.favoritesList.find(
    (favorite) => favorite.key === favoriteKey
  );
export default favoritesSlice.reducer;
