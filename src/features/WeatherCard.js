import clearSky from "./sun-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { favoriteDeleted } from "./favorites/favoritesSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchFiveDaysForecast,
  resetFiveDaysForecast,
  setSelectedCity,
} from "./homeWeather/fiveDaysForecastSlice";

function WeatherCard({
  cityName,
  countryName,
  cityTemp,
  weatherDescription,
  day = null,
  cityKey,
  display,
  currentForecast,
  cityTempCurrent,
}) {
  const dispatch = useDispatch();
  const isCelsius = useSelector((state) => state.settings.celsius);
  const navigate = useNavigate();

  const unitType = isCelsius ? "C" : "F";

  const onDeleteFromFavoritesClicked = (cityKey) => {
    cityKey.stopPropagation();
    dispatch(favoriteDeleted(cityKey));
  };

  const displayHomeWeather = (event) => {
    alert(11);
    dispatch(resetFiveDaysForecast());
    dispatch(
      setSelectedCity({
        city: cityName,
        key: cityKey,
        country: countryName,
      })
    );
    navigate("/");
  };
  if (day) {
    return (
      <li className="city">
        <h2 className="city-name">
          <span>{day}</span>
        </h2>
        <div className="city-temp">
          <div>
            {Math.round(cityTemp.Maximum.Value)}
            <sup>°{unitType}</sup>
          </div>
          <div className="min-temp">
            {Math.round(cityTemp.Minimum.Value)}
            <sup>°{unitType}</sup>
          </div>
        </div>
      </li>
    );
  } else if (display === "cityAndTemp") {
    return (
      <div
        className="card-container"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img className="city-icon" src={clearSky} alt={"weather-description"} />

        <div>
          <h2 className="city-name">
            <span>{cityName}</span>
          </h2>
          <div className="city-temp">
            <div>
              {Math.round(cityTemp.Maximum.Value)}
              <sup>°{unitType}</sup>
            </div>
            <div className="min-temp">
              {Math.round(cityTemp.Minimum.Value)}
              <sup>°{unitType}</sup>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (display === "favorites") {
    return (
      <li className="city" onClick={displayHomeWeather}>
        <button
          className="delete-button"
          onClick={() => onDeleteFromFavoritesClicked(cityKey)}
        >
          x
        </button>
        <h2 className="city-name">
          <span>{cityName}</span>
          <sup>{countryName}</sup>
        </h2>

        <div className="city-temp">
          <div>
            {cityTempCurrent}
            <sup>°{unitType}</sup>
          </div>
        </div>
        <figure>
          <img
            className="city-icon"
            src={clearSky}
            alt={"weather-description"}
          />

          <figcaption>{weatherDescription}</figcaption>
        </figure>
      </li>
    );
  }
}
export default WeatherCard;
