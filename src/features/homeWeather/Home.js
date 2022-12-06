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
    console.log("in use effect of 5days forcast");
    if (fiveDaysForecastData.length) {
      console.log(
        "we have data and not need to fetch again, this is the data:",
        fiveDaysForecastData
      );
      const previousUnitype =
        fiveDaysForecastData[0].DailyForecasts[0].Temperature.Maximum.Unit;

      if (
        (isCel && previousUnitype === "F") ||
        (!isCel && previousUnitype === "C")
      ) {
        console.log(
          "the user swith tem units so do fetch again and bring the righy units"
        );
        // we can convert this fetch by writing a convert function
        dispatch(fetchFiveDaysForecast());
      }
    } else if (fiveDaysForecastStatus === "idle") {
      console.log("do a forecast fetch please");
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
      <section className={"search-section"}>
        <SelectCity />
      </section>
      <section className="ajax-section">
        <HomeContent />
      </section>
    </>
  );
}
export default Home;
