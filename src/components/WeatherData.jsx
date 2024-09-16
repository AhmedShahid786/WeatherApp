import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

export const WeatherData = () => {
  const { currentWeather, city } = useContext(WeatherContext);
  const {desc, temp} = currentWeather
  return (
    <div className="w-2/4">
      <div className="testBorder3 w-full py-8 flex flex-col items-start justify-start">
        <p className="text-5xl mb-4">
          {city ? city[0].toUpperCase() + city.slice(1) : ""}
        </p>
        <p className="text-lg">
          {desc ? desc[0].toUpperCase() + desc.slice(1) : ""}
        </p>
      </div>
      <div className="w-full flex justify-start items-center">
        <p className="text-9xl">{Math.round(temp - 273.15)}</p>
        <span className="text-5xl mb-auto">{"\u00B0"}</span>
      </div>
    </div>
  );
};
