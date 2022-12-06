import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherCard from "../WeatherCard";
import {
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

  // useEffect(() => {
  // if (sessionStorage.getItem("dispatch current forecast")) {
  // console.log("full");
  // return;
  // } else {
  // console.log("empty");
  // if (CurrentconditionsStatus === "idle") {
  // dispatch(fetchCurrentconditionsArray());
  // sessionStorage.setItem("dispatch current forecast", true);
  // }
  // }
  // }, []);

  useEffect(() => {
    favorites.map(
      (favorite) => dispatch(fetchCurrentconditionsArray(favorite.key))
      // dispatch(fetchCurrentconditionsArray());
    );
  }, []);

  // const favorites = useSelector((state) => state.favorites.favoritesList);

  const renderedFavorites = favorites.map((favorite, index) => (
    <WeatherCard
      display={"favorites"}
      cityKey={favorite.key}
      cityName={favorite.city}
      countryName={favorite.country}
      cityTempCurrent={
        mockdatacurrent[index]?.Temperature
          ? mockdatacurrent[index].Temperature
          : mockdatacurrent[0].Temperature
      }
      // cityTemp={{
      //   Minimum: { Value: 74, Unit: "F", UnitType: 18 },
      //   Maximum: { Value: 60, Unit: "F", UnitType: 18 },
      // }}
      weatherDescription={"cloudy"}
      currentForecast={mockdatacurrent}
    />
  ));

  return (
    <section className="ajax-section">
      <div className="container">
        <ul className="cities">{renderedFavorites}</ul>
      </div>
    </section>
  );
};
