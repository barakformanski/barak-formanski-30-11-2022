const mockDataFiveDays = {
  Headline: {
    EffectiveDate: "2022-12-06T01:00:00+02:00",
    EffectiveEpochDate: 1670281200,
    Severity: 5,
    Text: "Expect showery weather late Monday night through Tuesday morning",
    Category: "rain",
    EndDate: "2022-12-06T13:00:00+02:00",
    EndEpochDate: 1670324400,
    MobileLink:
      "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?unit=c&lang=en-us",
    Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?unit=c&lang=en-us",
  },
  DailyForecasts: [
    {
      Date: "2022-12-05T07:00:00+02:00",
      EpochDate: 1670216400,
      Temperature: {
        Minimum: {
          Value: 15.2,
          Unit: "C",
          UnitType: 17,
        },
        Maximum: {
          Value: 23.6,
          Unit: "C",
          UnitType: 17,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 39,
        IconPhrase: "Partly cloudy w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=1&unit=c&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=1&unit=c&lang=en-us",
    },
    {
      Date: "2022-12-06T07:00:00+02:00",
      EpochDate: 1670302800,
      Temperature: {
        Minimum: {
          Value: 14.8,
          Unit: "C",
          UnitType: 17,
        },
        Maximum: {
          Value: 21.4,
          Unit: "C",
          UnitType: 17,
        },
      },
      Day: {
        Icon: 14,
        IconPhrase: "Partly sunny w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=2&unit=c&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=2&unit=c&lang=en-us",
    },
    {
      Date: "2022-12-07T07:00:00+02:00",
      EpochDate: 1670389200,
      Temperature: {
        Minimum: {
          Value: 15.4,
          Unit: "C",
          UnitType: 17,
        },
        Maximum: {
          Value: 21.0,
          Unit: "C",
          UnitType: 17,
        },
      },
      Day: {
        Icon: 3,
        IconPhrase: "Partly sunny",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
      },
      Night: {
        Icon: 38,
        IconPhrase: "Mostly cloudy",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=3&unit=c&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=3&unit=c&lang=en-us",
    },
    {
      Date: "2022-12-08T07:00:00+02:00",
      EpochDate: 1670475600,
      Temperature: {
        Minimum: {
          Value: 14.1,
          Unit: "C",
          UnitType: 17,
        },
        Maximum: {
          Value: 21.0,
          Unit: "C",
          UnitType: 17,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 38,
        IconPhrase: "Mostly cloudy",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=4&unit=c&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=4&unit=c&lang=en-us",
    },
    {
      Date: "2022-12-09T07:00:00+02:00",
      EpochDate: 1670562000,
      Temperature: {
        Minimum: {
          Value: 14.2,
          Unit: "C",
          UnitType: 17,
        },
        Maximum: {
          Value: 21.4,
          Unit: "C",
          UnitType: 17,
        },
      },
      Day: {
        Icon: 4,
        IconPhrase: "Intermittent clouds",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=5&unit=c&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=5&unit=c&lang=en-us",
    },
  ],
};

export default mockDataFiveDays;
