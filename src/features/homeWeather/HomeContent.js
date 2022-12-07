import { useSelector } from "react-redux";
import convertDay from "../../app/utils/convertDay";
import { Spinner } from "../../components/Spinner";
import WeatherCard from "../WeatherCard";

function HomeContent() {
  const fiveDaysForecastStatus = useSelector(
    (state) => state.fiveDaysForecast.status
  );
  const selectedCityData = useSelector(
    (state) => state.fiveDaysForecast.selectedCity
  );
  const fiveDaysForecastData = useSelector(
    (state) => state.fiveDaysForecast.fiveDaysForecast
  );
  const error = useSelector((state) => state.fiveDaysForecast.error);

  let content;

  if (fiveDaysForecastStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (fiveDaysForecastStatus === "succeeded") {
    content = (
      <div className="container">
        <WeatherCard
          cityName={selectedCityData.city}
          cityTemp={fiveDaysForecastData?.[0]?.DailyForecasts[0].Temperature}
          display={"cityAndTemp"}
        />
        <h1 className="weekly-title">
          {fiveDaysForecastData?.[0]?.Headline.Text}
        </h1>

        <ul className="cities">
          {fiveDaysForecastData?.[0]?.DailyForecasts?.map((day) => {
            return (
              <WeatherCard
                key={day.Date}
                cityTemp={day.Temperature}
                day={convertDay(day.Date).slice(0, 3)}
              />
            );
          })}
        </ul>
      </div>
    );
  } else if (fiveDaysForecastStatus === "failed") {
    content = <div className="error-message">{error}</div>;
  }
  return content;
}
export default HomeContent;
