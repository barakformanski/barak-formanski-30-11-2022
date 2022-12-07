import axios from "axios";
export const apiCall = async (urlPeriod, query, name, metric, key) => {
  let url;
  if (name === "fiveDaysForecast") {
    url = `http://dataservice.accuweather.com/${urlPeriod}?apikey=${process.env.REACT_APP_API_KEY}&metric=${metric}`;
  } else if (name === "autocomplete") {
    url = `http://dataservice.accuweather.com/${urlPeriod}?apikey=${process.env.REACT_APP_API_KEY}${query}`;
  } else if (name === "currentconditions") {
    url = `http://dataservice.accuweather.com/${urlPeriod}/${key}?apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);
    let resData = response.data;
    resData[0].key = key;
    return resData;
  }
  const response = await axios.get(url);
  return response.data;
};
