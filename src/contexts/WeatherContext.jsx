//? React Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { weatherIcons } from "../assets/constants/constants";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const apiKey = "f258d4a7f76f264d7ac94454d85a6dc2";

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [tomorrowWeather, setTomorrowWeather] = useState({});
  const [tomorrowHourlyWeather, setTomorrowHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState({});
  const [mapPosition, setMapPosition] = useState([]);
  const [locationRequest, setLocationRequest] = useState(false)
  const time = new Date().toLocaleTimeString();
  const currentHour = time.split(":")[0];
  let currentHourWeather;
  const findIcon = (iconId) => {
    const iconObject = weatherIcons.find((icon) => icon.icon === iconId);
    return iconObject.path;
  };

  //? Get current city to display data by default and also get
  //? longitude and latitude for one call api
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords: { latitude, longitude } }) => {
            try {
              const cityUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
              const res = await axios.get(cityUrl);
              setCity(res.data.name);
            } catch (error) {
              console.error("Error in fetching city based on location:", error);
              //* Set city to Karachi if there is an error
              setCity("Karachi");
            }
          },
          (error) => {
            console.error("Geolocation permission denied:", error);
            //* Set city to Karachi if permission is denied
            setCity("Karachi");
            setLocationRequest(true)
          }
        );
      } else {
        console.log(
          "Geolocation is not supported by this browser, setting city to Karachi"
        );
        //* Set city to Karachi if geolocation is not supported
        setCity("Karachi");
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    setLoading(true);

    const coardinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios
      .get(coardinatesUrl)
      .then((res) => {
        const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=minutely&appid=${apiKey}`;

        axios
          .get(oneCallUrl)
          .then((res) => {
            console.log(res);

            setMapPosition([res.data.lat, res.data.lon]);
            setCurrentWeather({
              desc: res.data.current.weather[0].description,
              temp: res.data.current.temp,
              img: findIcon(res.data.current.weather[0].id),
              humidity: res.data.current.humidity + "%",
              feelsLike: Math.round(res.data.current.feels_like - 273.15),
              pressure: res.data.current.pressure + " hPa",
              wind: res.data.current.wind_speed + " m/s",
              sunrise: new Date(res.data.current.sunrise).toLocaleTimeString(),
              sunset: new Date(res.data.current.sunset).toLocaleTimeString(),
            });
            const hourlyArr = res.data.hourly.slice(0, 23);
            setHourlyWeather(hourlyArr.slice(currentHour - 1));

            currentHourWeather = res.data.hourly.slice(23)[currentHour];
            setTomorrowWeather({
              desc: currentHourWeather.weather[0].description,
              temp: currentHourWeather.temp,
              img: findIcon(currentHourWeather.weather[0].id),
              humidity: currentHourWeather.humidity + "%",
              feelsLike: Math.round(currentHourWeather.feels_like - 273.15),
              pressure: currentHourWeather.pressure + " hPa",
              wind: currentHourWeather.wind_speed + " m/s",
              sunrise: new Date(res.data.current.sunrise).toLocaleTimeString(),
              sunset: new Date(res.data.current.sunset).toLocaleTimeString(),
            });
            const tomorrowHourlyArr = res.data.hourly.slice(23);
            setTomorrowHourlyWeather(tomorrowHourlyArr.slice(currentHour));

            const weeklyWeatherData = res.data.daily.slice(1, 8);
            const updatedWeeklyWeather = {
              temperature: [],
              humidity: [],
              wind: [],
              pressure: [],
              sunrise: [],
              sunset: [],
            };
            for (let i = 0; i < weeklyWeatherData.length; i++) {
              setWeeklyWeather(
                updatedWeeklyWeather.temperature.push(
                  Math.round(weeklyWeatherData[i].temp.day - 273.15)
                ),
                updatedWeeklyWeather.humidity.push(
                  weeklyWeatherData[i].humidity
                ),
                updatedWeeklyWeather.wind.push(weeklyWeatherData[i].wind_speed),
                updatedWeeklyWeather.pressure.push(
                  weeklyWeatherData[i].pressure
                ),
                updatedWeeklyWeather.sunrise.push(
                  new Date(weeklyWeatherData[i].sunset).toLocaleTimeString()
                ),
                updatedWeeklyWeather.sunset.push(
                  new Date(weeklyWeatherData[i].sunset).toLocaleTimeString()
                )
              );
            }
            setWeeklyWeather(updatedWeeklyWeather);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("error in fetching weather", err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error in getting coardinates for onecall api", err);
      });
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        currentWeather,
        hourlyWeather,
        tomorrowWeather,
        tomorrowHourlyWeather,
        weeklyWeather,
        mapPosition,
        locationRequest,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
