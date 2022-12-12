npm i
npm start

This site using the accuweather- api from https://developer.accuweather.com/ .
The api has limit of 100 calls for day.
If you have an error message on the site -
" Network Error" -
it probably means that api-key reached the limit ("the allowed number of requests has been exceeded").
In thet case - You can ask Barak for alternitive api-key, or to use the mockdata form the code.
There are 3 api calls and 3 mockdata tyou can use.
1- on FavoriteList file, in the render of WeatherCard component- saved under the name- mockdatacurrent.
2- on SelectCity file- saved under the name- mockDataAutoCompleteresponse.
3- on fiveDaysForecastSlice- saved under "mockDataFiveDays"

Barak - 0545665174
