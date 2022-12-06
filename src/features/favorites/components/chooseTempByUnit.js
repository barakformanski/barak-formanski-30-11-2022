import { useSelector } from "react-redux";

function ChooseTempByUnit({ cityTempCurrent }) {
  const isCelsius = useSelector((state) => state.settings.celsius);

  let displayRightTemp;
  const unit = isCelsius ? "Metric" : "Imperial";
  displayRightTemp = (
    <div>
      {Math.round(cityTempCurrent[unit].Value)}
      <sup>{cityTempCurrent[unit].Unit}°</sup>
    </div>
  );

  return <div className="city-temp">{displayRightTemp}</div>;
}

export default ChooseTempByUnit;
