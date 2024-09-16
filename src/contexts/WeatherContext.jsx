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
  const [humidity, setHumidity] = useState("")
  const [desc, setDesc] = useState("");
  const [ temp, setTemp ] = useState()
  const [ img, setImg ] = useState("")

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

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f258d4a7f76f264d7ac94454d85a6dc2`;
  useEffect(() => {
    axios.get(url)
    .then((res)=> {
      console.log(res)
      setCurrentWeather({
        desc: res.data.weather[0].description,
        temp: res.data.main.temp,
        img: res.data.weather[0].icon,
        humidity: res.data.main.humidity,
      });
      setHumidity(res.data.main.humidity)
      setDesc(res.data.weather[0].description)
      setImg(res.data.weather[0].icon);
      setTemp(res.data.main.temp)
      
  })
  }, []);

  return (
    <WeatherContext.Provider value={{ city, setCity, img, temp, desc,humidity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherContextProvider };
