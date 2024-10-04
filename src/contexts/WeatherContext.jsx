//? React Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const apiKey = "f258d4a7f76f264d7ac94454d85a6dc2";

  const [city, setCity] = useState("")
  const [ currentWeather, setCurrentWeather ] = useState({}) 
  const [ hourlyWeather, setHourlyWeather ] = useState([])
  const [ tomorrowWeather, setTomorrowWeather ] = useState([])
  const [ weekWeather, setWeekWeather ] = useState([])
  
  //? Get current city to display data by default and also get
  //? longitude and latitude for one call api 
useEffect(()=>{
const fetchWeatherData = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        try {
          const cityUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
           axios.get(cityUrl)
          .then((res)=>{
            setCity(res.data.name);
          })
        } catch (error) {
          console.error("City set as Karachi due to error in fetching city:", error);
          setCity("Karachi");
        }
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser, city set as Karachi")
    setCity("Karachi");
  }
};
fetchWeatherData()
},[])

 useEffect(() => {

    const coardinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(coardinatesUrl)
    .then((res)=>{
      const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=minutely&appid=${apiKey}`;

      axios.get(oneCallUrl)
        .then((res) => {
          console.log(res);
          setCurrentWeather({
            desc: res.data.current.weather[0].description,
            temp: res.data.current.temp,
            img: res.data.current.weather[0].icon,
            humidity: res.data.current.humidity,
            feelsLike: Math.round(res.data.current.feels_like - 273.15),
            pressure: res.data.current.pressure,
            wind: res.data.current.wind_speed,
            sunrise: new Date(res.data.current.sunrise).toLocaleTimeString(),
            sunset: new Date(res.data.current.sunset).toLocaleTimeString(),
          });

          setHourlyWeather(res.data.hourly.slice(0, 23));
          setTomorrowWeather(res.data.hourly.slice(24));
          setWeekWeather(res.data.daily);
        })
        .catch((err) => console.log("error in fetching weather", err));
    }).catch((err)=>console.log("Error in getting coardinates for onecall api", err))
}, [city]);

  return (
    <WeatherContext.Provider value={{ city, setCity, currentWeather, hourlyWeather, tomorrowWeather, weekWeather}}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
