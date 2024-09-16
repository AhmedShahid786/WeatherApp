//? React Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const apiKey = "f258d4a7f76f264d7ac94454d85a6dc2";

  const [ currentWeather, setCurrentWeather ] = useState({}) 

  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [city, setCity] = useState("karachi")

//? Get current city to display data by default and also get
//? longitude and latitude for one call api 
// useEffect(() => {
//    const fetchWeatherData = async () => {
//      if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(
//          async ({ coords: { latitude, longitude } }) => {
//            try {
//              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
//              const response = await axios.get(url);
//              setCity(response.data.name);
//              setLat(latitude);
//              setLon(longitude);
//            } catch (error) {
//              console.error("Error in fetching city:", error);
//            }
//          },
//          (error) => console.error("Geolocation error:", error.message)
//        );
//      } else {
//        console.log("Geolocation is not supported by this browser, city set as Karachi");
//        setCity("karachi")
//      }
//    };
//    fetchWeatherData();
//  }, []);

const urlCW = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f258d4a7f76f264d7ac94454d85a6dc2`;
  useEffect(() => {
    axios.get(urlCW)
    .then((res)=> {
      console.log(res)
      setCurrentWeather({
        desc: res.data.weather[0].description,
        temp: res.data.main.temp,
        img: res.data.weather[0].icon,
        humidity: res.data.main.humidity,
        feelsLike: res.data.main.feels_like,
        pressure: res.data.main.pressure,
        wind: res.data.wind.speed,
        sunrise: res.data.sys.sunrise,
        sunset: res.data.sys.sunset
      });
  }).catch((err)=>console.log("error in fetching current weather", err))
  }, [city]);

  return (
    <WeatherContext.Provider value={{currentWeather, city, setCity}}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
