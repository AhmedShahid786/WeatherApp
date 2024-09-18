import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { themeContext } from "../contexts/ThemeContext";

export const WeatherData = () => {
  const {theme} = useContext(themeContext)
  const { currentWeather, city } = useContext(WeatherContext);
  const {desc, temp} = currentWeather
  return (
    <div className="w-2/4">
      <div className="testBorder3 w-full py-8 flex flex-col items-start justify-start">
        <p
          className={`text-5xl mb-4
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}
          `}
        >
          {city ? city[0].toUpperCase() + city.slice(1) : ""}
        </p>
        <p
          className={`text-lg
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          {desc ? desc[0].toUpperCase() + desc.slice(1) : ""}
        </p>
      </div>
      <div className="w-full flex justify-start items-center">
        <p
          className={`text-9xl
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
        >
          {temp ? Math.round(temp - 273.15) : ""}
        </p>
        <span
          className={`text-5xl mb-auto
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          {"\u00B0"}
        </span>
      </div>
    </div>
  );
};
