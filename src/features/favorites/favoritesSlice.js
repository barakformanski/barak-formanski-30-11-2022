import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../app/utils/apiCalls";

const mockDatacurrent1 = {
  key: "3333559",
  LocalObservationDateTime: "2022-12-06T22:43:00+02:00",
  EpochTime: 1670359380,
  WeatherText: "Mostly clear",
  WeatherIcon: 34,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: {
      Value: 18.1,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 65.0,
      Unit: "F",
      UnitType: 18,
    },
  },
  MobileLink:
    "http://www.accuweather.com/en/il/tel-aviv-port/215793/current-weather/215793?lang=en-us",
  Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/current-weather/215793?lang=en-us",
};

const mockDatacurrent2 = {
  key: "3338317",
  LocalObservationDateTime: "2022-12-06T22:43:00+02:00",
  EpochTime: 1670359380,
  WeatherText: "Mostly clear",
  WeatherIcon: 34,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: {
      Value: 16.6,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 62.0,
      Unit: "F",
      UnitType: 18,
    },
  },
  MobileLink:
    "http://www.accuweather.com/en/il/florentine/215790/current-weather/215790?lang=en-us",
  Link: "http://www.accuweather.com/en/il/florentine/215790/current-weather/215790?lang=en-us",
};

const mockDatacurrent3 = {
  key: "215793",
  LocalObservationDateTime: "2022-12-06T22:43:00+02:00",
  EpochTime: 1670359380,
  WeatherText: "Mostly clear",
  WeatherIcon: 34,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: {
      Value: 21.6,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 71.0,
      Unit: "F",
      UnitType: 18,
    },
  },
  MobileLink:
    "http://www.accuweather.com/en/il/en-boqeq/215690/current-weather/215690?lang=en-us",
  Link: "http://www.accuweather.com/en/il/en-boqeq/215690/current-weather/215690?lang=en-us",
};

const mockDatacurrent4 = {
  LocalObservationDateTime: "2022-12-06T22:43:00+02:00",
  EpochTime: 1670359380,
  WeatherText: "Mostly clear",
  WeatherIcon: 34,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: false,
  Temperature: {
    Metric: {
      Value: 14.7,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 58.0,
      Unit: "F",
      UnitType: 18,
    },
  },
  MobileLink:
    "http://www.accuweather.com/en/il/shahar/215670/current-weather/215670?lang=en-us",
  Link: "http://www.accuweather.com/en/il/shahar/215670/current-weather/215670?lang=en-us",
};

const initialState = {
  favoritesList: [
    { city: "tel aviv", key: "215793", country: "israel" },
    // { key: "3338317", city: "Sder", country: "India" },
    // { key: "3333559", city: "Sdhnongkalong", country: "India" },
  ],
  currentForecastArray: [],
  // currentForecastArray: [mockDatacurrent1, mockDatacurrent2, mockDatacurrent3],
  status: "idle",
  error: null,
};

export const fetchCurrentconditionsArray = createAsyncThunk(
  "currentDayForecast/fetchCurrentForecast",
  async (key, { getState }) => {
    console.log("arg", key);
    // const urlPeriod = `currentconditions/v1/${key}`;
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
export const { favoriteAdded, favoriteDeleted, clearCurrentForecastArray } =
  favoritesSlice.actions;
export const selectAllfavorites = (state) => state.favorites.favoritesList;
export const selectfavoriteByKey = (state, favoriteKey) =>
  state.favorites.favoritesList.find(
    (favorite) => favorite.key === favoriteKey
  );
export default favoritesSlice.reducer;
