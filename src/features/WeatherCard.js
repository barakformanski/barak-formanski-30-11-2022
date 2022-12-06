import clearSky from "./sun-svgrepo-com.svg";
import { useDispatch } from "react-redux";
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

  const onDeleteFromFavoritesClicked = (cityKey) => {
    dispatch(favoriteDeleted(cityKey));
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
            <sup>°C</sup>
          </div>
          <div className="min-temp">
            {Math.round(cityTemp.Minimum.Value)}
            <sup>°C</sup>
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
              <sup>°C</sup>
            </div>
            <div className="min-temp">
              {Math.round(cityTemp.Minimum.Value)}
              <sup>°C</sup>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (display === "favorites") {
    console.log("currentForecast", currentForecast);
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
        <ChooseTempByUnit cityTempCurrent={cityTempCurrent} />

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
