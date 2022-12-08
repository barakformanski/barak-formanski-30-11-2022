import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherCard from "../WeatherCard";
import {
  clearCurrentForecastArray,
  fetchCurrentconditionsArray,
  selectAllfavorites,
} from "./favoritesSlice";

export const FavoritesList = () => {
  const isCelsius = useSelector((state) => state.settings.celsius);
  const favorites = useSelector(selectAllfavorites);
  const fiveDaysForecastStatus = useSelector(
    (state) => state.fiveDaysForecast.status
  );
  const dispatch = useDispatch();

  const CurrentconditionsData = useSelector(
    (state) => state.favorites.currentForecastArray
  );

  useEffect(() => {
    favorites.map((favorite) =>
      dispatch(fetchCurrentconditionsArray(favorite.key))
    );
    return () => dispatch(clearCurrentForecastArray());
  }, []);

  const mergeArrays = (key) => {
    const index = CurrentconditionsData.findIndex((obj) => obj.key == key);
    return index;
  };

  const calculateTemp = (key) => {
    const unit = isCelsius === true ? "Metric" : "Imperial";
    return CurrentconditionsData[mergeArrays(key)]?.Temperature[unit].Value;
  };
  const calculateDescription = (key) => {
    return CurrentconditionsData[mergeArrays(key)]?.WeatherText;
  };

  const renderedFavorites = favorites.map((favorite, index) => {
    return (
      <>
        <WeatherCard
          key={favorite.key}
          display={"favorites"}
          cityKey={favorite.key}
          cityName={favorite.city}
          countryName={favorite.country}
          cityTempCurrent={calculateTemp(favorite.key)}
          weatherDescription={calculateDescription(favorite.key)}
          currentForecast={CurrentconditionsData}
          //import  mockdatacurrent and use it to save request or when accses denied ""The allowed number of requests has been exceeded."
          // currentForecast={mockdatacurrent}
        />

        {fiveDaysForecastStatus === "failed" && (
          <div className="error-message">
            Probably the allowed number of requests has been exceeded, try to
            generate a new api-key from AccuWwather APIs- connect Barak for more
            help - 0545665174- in the meantime - you can ask Barak to show you
            the site with mockdata
          </div>
        )}
      </>
    );
  });

  return (
    <section className="ajax-section">
      <div className="container">
        <ul className="cities">{renderedFavorites}</ul>
      </div>
    </section>
  );
};
