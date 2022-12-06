import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../app/utils/apiCalls";
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
    console.log(
      "state.fiveDaysForecast.selectedCity",
      state.fiveDaysForecast.selectedCity
    );
    const key = state.fiveDaysForecast.selectedCity.key;
    const metric = state.settings.celsius;
    const urlPeriod = `forecasts/v1/daily/5day/${key}`;
    const responseData = await apiCall(
      urlPeriod,
      null,
      "fiveDaysForecast",
      metric
    );
    // return response.data;
    return responseData;
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFiveDaysForecast.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFiveDaysForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.fiveDaysForecast = state.fiveDaysForecast.concat(action.payload);
        state.fiveDaysForecast = [action.payload];
      })
      .addCase(fetchFiveDaysForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity } = fiveDaysForecastSlice.actions;

export default fiveDaysForecastSlice.reducer;

// e
