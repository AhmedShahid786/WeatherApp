//? React Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const apiKey = "f258d4a7f76f264d7ac94454d85a6dc2";

  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [city, setCity] = useState("")

//? Get current city to display data by default and also get
//? longitude and latitude for one call api 
useEffect(() => {
   const fetchWeatherData = async () => {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         async ({ coords: { latitude, longitude } }) => {
           setLat(latitude);
           setLon(longitude);
           try {
             const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
             const response = await axios.get(url);
             setCity(response.data.name);
           } catch (error) {
             console.error("Error in fetching city:", error);
           }
         },
         (error) => console.error("Geolocation error:", error.message)
       );
     } else {
       console.log("Geolocation is not supported by this browser, city set as Karachi");
       setCity("karachi")
     }
   };
   fetchWeatherData();
 }, []);

  useEffect(() => {
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f258d4a7f76f264d7ac94454d85a6dc2`
    );
  }, []);

  return (
    <WeatherContext.Provider value={{ city, setCity, img, temp, desc }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
