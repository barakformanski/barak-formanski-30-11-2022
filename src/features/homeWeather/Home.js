import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiveDaysForecast } from "./fiveDaysForecastSlice";
import HomeContent from "./HomeContent";
import SelectCity from "./SelectCity";

function Home() {
  const selectedCityData = useSelector(
    (state) => state.fiveDaysForecast.selectedCity
  );
  const fiveDaysForecastData = useSelector(
    (state) => state.fiveDaysForecast.fiveDaysForecast
  );
  const fiveDaysForecastStatus = useSelector(
    (state) => state.fiveDaysForecast.status
  );
  const isCel = useSelector((state) => state.settings.celsius);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fiveDaysForecastData.length) {
      const previousUnitype =
        fiveDaysForecastData[0].DailyForecasts[0].Temperature.Maximum.Unit;

      if (
        (isCel && previousUnitype === "F") ||
        (!isCel && previousUnitype === "C")
      ) {
        dispatch(fetchFiveDaysForecast());
      }
    } else if (fiveDaysForecastStatus === "idle") {
      dispatch(fetchFiveDaysForecast());
    }
  }, [
    selectedCityData,
    isCel,
    fiveDaysForecastStatus,
    dispatch,
    fiveDaysForecastData,
  ]);

  return (
    <>
      <section className="search-section">
        <SelectCity />
      </section>
      <section className="ajax-section">
        <HomeContent />
      </section>
    </>
  );
}
export default Home;
