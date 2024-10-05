import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import additionalInfoIcons from "../../assets/icons/icons";
import { WeatherIcon } from "../../components/WeatherIcon";
import { WeatherData } from "../../components/WeatherData";
import { AdditionalInfo } from "../../components/AdditionalInfo";
import { themeContext } from "../../contexts/ThemeContext";
import WeatherHourly from "../../components/WeatherHourly";

const WeatherToday = () => {
  const { theme } = useContext(themeContext);
  const { currentWeather, hourlyWeather } = useContext(WeatherContext);
  const AdditionalInfoVals = [
    currentWeather.humidity,
    currentWeather.pressure,
    currentWeather.feelsLike,
    currentWeather.sunrise,
    currentWeather.sunset,
    currentWeather.wind,
  ];
  return (
    <section className="flex flex-col items-center justify-center pr-4 pt-2 flex-wrap">
      <div className="flex w-full">
        <div className={`w-2/4 flex text-sub customFont`}>
          <WeatherData />
          <div className="w-2/4 flex items-center justify-center">
            <WeatherIcon />
          </div>
        </div>

        <div
          className={`w-2/4 h-full flex flex-wrap justify-around items-center border-2 px-4 rounded-lg
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
        >
          {additionalInfoIcons.map((icon, ind) => {
            return (
              <AdditionalInfo
                icon={icon.icon}
                label={icon.label}
                value={AdditionalInfoVals[ind]}
                key={ind}
              />
            );
          })}
        </div>
      </div>

      <div
        className={`w-full border-2 px-2 rounded-lg flex-wrap
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
      >
        <div className="w-full">
          <p
            className={`text-xl
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
          >
            Hourly Forecast
          </p>
        </div>
        <div>
          <WeatherHourly hourlyWeatherData={hourlyWeather} />
        </div>
      </div>
    </section>
  );
};

export default WeatherToday;
