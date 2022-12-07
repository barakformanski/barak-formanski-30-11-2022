import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../app/utils/apiCalls";
import { favoriteAdded, selectAllfavorites } from "../favorites/favoritesSlice";
import {
  fetchFiveDaysForecast,
  setSelectedCity,
} from "./fiveDaysForecastSlice";
import mockDataAutoCompleteresponse from "./mockDataAutoComplete";

function SelectCity() {
  const [display, setDisplay] = useState("disappear");
  const dispatch = useDispatch();
  const selectedCityData = useSelector(
    (state) => state.fiveDaysForecast.selectedCity
  );

  const favorties = useSelector(selectAllfavorites);
  const [message, setMessage] = useState();
  const [autoCompleteData, setAutoCompleteData] = useState();
  const [inputValue, setInputValue] = useState();
  const [enableAddToFavortie, setEnableAddToFavortie] = useState(false);

  const handleChange = async (e) => {
    setDisplay("appear");
    setInputValue(e.target.value);
    const urlPeriod = "locations/v1/cities/autocomplete";
    const query = `&q=${e.target.value}`;
    // const responseDataAutoComplete = await apiCall(
    //   urlPeriod,
    //   query,
    //   "autocomplete"
    // );
    //   setAutoCompleteData(responseDataAutoComplete);
    // console.log("auto complete response", responseDataAutoComplete);

    setAutoCompleteData(mockDataAutoCompleteresponse);

    console.log(
      "mock data auto complete response",
      mockDataAutoCompleteresponse
    );
  };
  const onSelectChange = async (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setDisplay("disappear");
    console.log(e.target.value);
    console.log(display);
    const [selectedCityFormList] = autoCompleteData.filter(
      (city) => city.LocalizedName === e.target.value
    );
    console.log("selectedCityFormList", selectedCityFormList);
    dispatch(
      setSelectedCity({
        city: selectedCityFormList.LocalizedName,
        key: selectedCityFormList.Key,
        country: selectedCityFormList.Country.LocalizedName,
      })
    );
    // return this to enable fetching 5 dats data after switching cities
    // dispatch(fetchFiveDaysForecast());
  };
  const onAddToFavoritesClicked = () => {
    console.log(111, selectedCityData);
    dispatch(
      favoriteAdded({
        key: selectedCityData.key,
        city: selectedCityData.city,
        country: selectedCityData.country,
      })
    );
  };

  let disableButtonChecking = {};
  if (
    !selectedCityData.city ||
    favorties.find((favorite) => favorite.city === selectedCityData.city) ||
    inputValue !== selectedCityData.city
  ) {
    disableButtonChecking.disabled = true;
  } else disableButtonChecking.disabled = false;

  return (
    <div className={"container"}>
      <form>
        ssss
        <input
          value={
            selectedCityData && display === "disappear"
              ? selectedCityData.city
              : inputValue
          }
          spellCheck="false"
          autoComplete="off"
          type="text"
          placeholder="Search for a city"
          autoFocus
          onChange={(e) => handleChange(e)}
          name="city"
        />
        sss
        <span className="msg">{message}</span>
        <ul className={`search-list-select-${display}`} id="search">
          {autoCompleteData?.map((city) => {
            return (
              <li key={city.Key}>
                <button
                  value={city.LocalizedName}
                  key={city.key}
                  onClick={(e) => onSelectChange(e)}
                >
                  {city.LocalizedName}
                </button>
              </li>
            );
          })}
        </ul>
      </form>

      <button
        className="regular"
        type="button"
        onClick={onAddToFavoritesClicked}
        {...disableButtonChecking}
      >
        add to favotites
      </button>
    </div>
  );
}

export default SelectCity;
