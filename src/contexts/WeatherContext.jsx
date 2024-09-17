//? React Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const apiKey = "f258d4a7f76f264d7ac94454d85a6dc2";

  const [ currentWeather, setCurrentWeather ] = useState({}) 
  const [ hourlyWeather, setHourlyWeather ] = useState([])
  const [ tomorrowWeather, setTomorrowWeather ] = useState([])
  const [ weekWeather, setWeekWeather ] = useState([])


  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [city, setCity] = useState("")
  const [startCall, setStartCall] = useState(false)
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`;
  
  //? Get current city to display data by default and also get
  //? longitude and latitude for one call api 
useEffect(()=>{
const fetchWeatherData = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const urlCity = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
          const response = await axios.get(urlCity);
          setLat(latitude);
          setLon(longitude);
          setCity(response.data.name);
        } catch (error) {
          console.error("Error in fetching city:", error);
        }
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser, city set as Karachi")
    setCity("karachi");
  }
};
fetchWeatherData()
},[])

 useEffect(() => {
    axios.get(url)
    .then((res)=> {
      console.log(res);
      setCurrentWeather({
        desc: res.data.current.weather[0].description,
        temp: res.data.current.temp,
        img: res.data.current.weather[0].icon,
        humidity: res.data.current.humidity,
        feelsLike: res.data.current.feels_like,
        pressure: res.data.current.pressure,
        wind: res.data.current.wind_speed,
        sunrise: res.data.current.sunrise,
        sunset: res.data.current.sunset,
      });

      setHourlyWeather(res.data.hourly.slice(0, 23))
      setTomorrowWeather(res.data.hourly.slice(24))
      setWeekWeather(res.data.daily)

  }).catch((err)=>console.log("error in fetching current weather", err))
}, [city]);

  return (
    <WeatherContext.Provider value={{currentWeather, city, setCity}}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
