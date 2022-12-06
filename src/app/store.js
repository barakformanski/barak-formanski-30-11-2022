import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "../features/favorites/favoritesSlice";
import settingsSlice from "../features/settings/settingsSlice";
import fiveDaysForecast from "../features/homeWeather/fiveDaysForecastSlice";
export default configureStore({
  reducer: {
    settings: settingsSlice,
    fiveDaysForecast: fiveDaysForecast,
    favorites: favoritesReducer,
  },
});
