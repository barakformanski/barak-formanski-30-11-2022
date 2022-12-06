import axios from "axios";
export const apiCall = async (urlPeriod, query, name, metric) => {
  let url;
  if (!query && name === "fiveDaysForecast") {
    url = `http://dataservice.accuweather.com/${urlPeriod}?apikey=${process.env.REACT_APP_API_KEY}&metric=${metric}`;
  } else if (query && name === "autocomplete") {
    url = `http://dataservice.accuweather.com/${urlPeriod}?apikey=${process.env.REACT_APP_API_KEY}${query}`;
  } else if (name === "currentconditions") {
    url = `http://dataservice.accuweather.com/${urlPeriod}?apikey=${process.env.REACT_APP_API_KEY}`;
  }
  const response = await axios.get(url);
  return response.data;
};
