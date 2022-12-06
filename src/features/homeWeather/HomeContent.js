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
    console.log("LOADING DATA");
    content = <Spinner text="Loading..." />;
  } else if (fiveDaysForecastStatus === "succeeded") {
    console.log(
      "FETCHING SUCCEDED ALREADY - (now or before)",
      fiveDaysForecastData
    );
    content = (
      <div className="container">
        <div>
          <WeatherCard
            cityName={selectedCityData.city}
            cityTemp={fiveDaysForecastData?.[0]?.DailyForecasts[0].Temperature}
            display={"cityAndTemp"}
          />
        </div>
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
    console.log("FFAILED FETCHING");
  }
  return content;
}
export default HomeContent;