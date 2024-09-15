import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";

const {img} = useContext(CityContext)

export const WeatherIcon = () => {
  return <img src={img} alt="" className="w-80 h-80" />;
}
