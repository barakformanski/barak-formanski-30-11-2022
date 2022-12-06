const convertDay = (date) => {
  const dateToConvert = new Date(date);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[dateToConvert.getDay()];
};

export default convertDay;
