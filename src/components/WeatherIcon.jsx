import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

export const WeatherIcon = () => {
  const { img } = useContext(WeatherContext);

  return <img src={img} alt="" className="w-80 h-80" />;
};
