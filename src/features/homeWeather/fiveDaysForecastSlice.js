import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../app/utils/apiCalls";
// import mockDataFiveDays from "./mocdDataFiveDaysForecast";
const initialState = {
  fiveDaysForecast: [],
  status: "idle",
  error: null,
  selectedCity: { city: "tel aviv", key: 215793, country: "israel" },
};

export const fetchFiveDaysForecast = createAsyncThunk(
  "FiveDaysForecast/fetchFiveDays",
  async (arg, { getState }) => {
    const state = await getState();

    const key = state.fiveDaysForecast.selectedCity.key;
    const metric = state.settings.celsius;
    const urlPeriod = `forecasts/v1/daily/5day/${key}`;
    const responseData = await apiCall(
      urlPeriod,
      null,
      "fiveDaysForecast",
      metric
    );
    return responseData;
    // mockDataFiveDays-
    // mock - data usr for fiveDays - forecast
    // const responseData = await setTimeout(() =>
    //   console.log("use mock data for fiveDaysForecast")
    // );
    // return mockDataFiveDays;
  }
);

const fiveDaysForecastSlice = createSlice({
  name: "fiveDaysForecast",
  initialState,
  reducers: {
    setSelectedCity(state, action) {
      const { city, key, country } = action.payload;
      state.selectedCity.city = city;
      state.selectedCity.key = key;
      state.selectedCity.country = country;
    },
    resetFiveDaysForecast(state, action) {
      state.fiveDaysForecast = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFiveDaysForecast.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFiveDaysForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fiveDaysForecast = [action.payload];
      })
      .addCase(fetchFiveDaysForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity, resetFiveDaysForecast } =
  fiveDaysForecastSlice.actions;

export default fiveDaysForecastSlice.reducer;
