import clearSky from "./sun-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { favoriteDeleted } from "./favorites/favoritesSlice";
import ChooseTempByUnit from "./favorites/components/chooseTempByUnit";

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

  const unitType = isCelsius ? "C" : "F";

  const onDeleteFromFavoritesClicked = (cityKey) => {
    dispatch(favoriteDeleted(cityKey));
  };
  console.log("cityTempCurrent", cityTempCurrent);
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
      <div style={{ display: "flex", flexDirection: "row" }}>
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
    console.log("cityTempCurrent", cityTempCurrent);
    return (
      <li className="city">
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
