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
  const mockdatacurrent = [
    {
      LocalObservationDateTime: "2022-12-06T13:18:00+02:00",
      EpochTime: 1670325480,
      WeatherText: "Partly sunny",
      WeatherIcon: 3,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: true,
      Temperature: {
        Metric: {
          Value: 21,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 70,
          Unit: "F",
          UnitType: 18,
        },
      },
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/current-weather/215793?lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/current-weather/215793?lang=en-us",
    },
  ];
  const dispatch = useDispatch();

  const CurrentconditionsData = useSelector(
    (state) => state.favorites.currentForecastArray
  );
  const CurrentconditionsStatus = useSelector(
    (state) => state.favorites.status
  );

  // ENABLE THIS TO RUN CURRENT WEATHER FETCH
  useEffect(() => {
    favorites.map((favorite) =>
      dispatch(fetchCurrentconditionsArray(favorite.key))
    );
    return () => dispatch(clearCurrentForecastArray());
  }, []);

  const mergeArrays = (key) => {
    console.log("key to index", key);
    console.log("CurrentconditionsData", CurrentconditionsData);
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
    console.log("favorite", favorite);
    console.log(mergeArrays(favorite.key));
    return (
      <WeatherCard
        key={favorite.key}
        display={"favorites"}
        cityKey={favorite.key}
        cityName={favorite.city}
        countryName={favorite.country}
        // cityTempCurrent={mergeArrays(favorite.key)}
        cityTempCurrent={calculateTemp(favorite.key)}
        // cityTemp={{
        //   Minimum: { Value: 74, Unit: "F", UnitType: 18 },
        //   Maximum: { Value: 60, Unit: "F", UnitType: 18 },
        // }}
        weatherDescription={calculateDescription(favorite.key)}
        currentForecast={mockdatacurrent}
      />
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
