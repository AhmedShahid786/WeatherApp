import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

export const WeatherIcon = () => {
  const { currentWeather } = useContext(WeatherContext);
  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.img}@2x.png`;
  
  return <img src={iconUrl} alt="" className="w-80 h-80" />;
};
