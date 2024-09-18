import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import gifs from "../../assets/gifs/gifs"
import { WeatherIcon } from "../../components/WeatherIcon";
import { WeatherData } from "../../components/WeatherData";
import { AdditionalInfo } from "../../components/AdditionalInfo";
import { themeContext } from "../../contexts/ThemeContext";

const WeatherToday = () => {
  const {theme} = useContext(themeContext)
  const {currentWeather} = useContext(WeatherContext)
  const AdditionalInfoVals = [
    currentWeather.humidity, 
    currentWeather.pressure,
    currentWeather.feelsLike,
    currentWeather.sunrise,
    currentWeather.sunset,
    currentWeather.wind,
  ];
  return (
    <section className="testBorder flex flex-col items-center justify-center pr-4">
      <div className="flex w-full">
        <div className={`testBorder2 w-2/4 flex text-sub customFont`}>
          <WeatherData />
          <div className="testBorder3 w-2/4 flex items-center justify-center">
            <WeatherIcon />
          </div>
        </div>

        <div
          className={`w-2/4 h-full flex flex-wrap justify-around items-center border-2 px-4 rounded-lg
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
        >
          {gifs.map((gif, ind) => {
            return (
              <AdditionalInfo
                pic={gif.gif}
                label={gif.label}
                value={AdditionalInfoVals[ind]}
                key={ind}
              />
            );
          })}
        </div>
      </div>

      <div
        className={`testBorder3 w-full border-2 px-4 rounded-lg mt-2
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
      >
        <p
          className={`text-xl opactiy-50
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          Hourly Forecast
        </p>

        <div className="testBorder2 w-full"></div>
      </div>
    </section>
  );
};

export default WeatherToday;
