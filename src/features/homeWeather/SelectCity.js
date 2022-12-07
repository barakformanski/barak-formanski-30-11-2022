import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../app/utils/apiCalls";
import {
  favoriteAdded,
  favoriteDeleted,
  selectAllfavorites,
} from "../favorites/favoritesSlice";
import {
  fetchFiveDaysForecast,
  navigate,
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
    if (!e.target.value) {
      setDisplay("disappear");
      setInputValue();
    } else {
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
    }
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
  } else {
    disableButtonChecking.disabled = false;
  }

  const addToFavorites = () => {
    onAddToFavoritesClicked();
  };
  const deleteFromFavorites = () => {
    dispatch(favoriteDeleted(selectedCityData.key));
  };

  let renderButtonText;
  if (favorties.find((favorite) => favorite.city === selectedCityData.city)) {
    renderButtonText = (
      <button className="regular" type="button" onClick={deleteFromFavorites}>
        delete from favotites
      </button>
    );
  } else if (selectedCityData.city) {
    renderButtonText = (
      <button className="regular" type="button" onClick={addToFavorites}>
        add to favotites
      </button>
    );
  } else {
    return <></>;
  }
  const displayValueInput = () => {
    if (selectedCityData && display === "disappear") {
      return selectedCityData.city;
    } else {
      return inputValue;
    }
  };

  return (
    <div className={"container"}>
      <div className={"add-favorite-button-input-container"}>
        <form>
          <input
            value={displayValueInput()}
            spellCheck="false"
            autoComplete="off"
            type="text"
            placeholder="Search for a city"
            autoFocus
            onChange={(e) => handleChange(e)}
            name="city"
          />

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
        {renderButtonText}

        {/* <button
          className="regular"
          type="button"
          // onClick={onAddToFavoritesClicked}
          onClick={addOrDelete}
          // {...disableButtonChecking}
        >
          {renderButtonText}
        </button> */}
      </div>
    </div>
  );
}

export default SelectCity;
