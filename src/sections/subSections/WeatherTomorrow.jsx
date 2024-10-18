//? Hooks imports
import { useContext } from "react";

//? Components imports
import { WeatherContext } from "../../contexts/WeatherContext";
import { additionalInfoIcons } from "../../assets/constants/constants";
import { WeatherIcon } from "../../components/WeatherIcon";
import { WeatherData } from "../../components/WeatherData";
import { AdditionalInfo } from "../../components/AdditionalInfo";
import { themeContext } from "../../contexts/ThemeContext";
import WeatherHourly from "../../components/WeatherHourly";

const WeatherTomorrow = () => {
  const { theme } = useContext(themeContext);
  const { tomorrowWeather, city, tomorrowHourlyWeather } = useContext(WeatherContext);
  
  const AdditionalInfoVals = [
    tomorrowWeather.humidity,
    tomorrowWeather.pressure,
    tomorrowWeather.feelsLike,
    tomorrowWeather.sunrise,
    tomorrowWeather.sunset,
    tomorrowWeather.wind,
  ];
  return (
    <section className="flex flex-col items-center justify-center sm:pr-4 sm:pt-2 max-sm:px-2 flex-wrap">
      <div className="flex max-sm:flex-col max-sm:gap-8 w-full">
        <div className={`w-2/4 max-sm:w-full flex text-sub customFont`}>
          <WeatherData
            currentWeather={tomorrowWeather ? tomorrowWeather : null}
            city={city ? city : null}
          />
          <div className="w-2/4 pt-8 flex items-center justify-center">
            <WeatherIcon src={tomorrowWeather ? tomorrowWeather.img : null} />
          </div>
        </div>

        <div
          className={`w-2/4 max-sm:w-full h-full flex flex-wrap justify-around items-center border-2 px-4 rounded-lg
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
        >
          {additionalInfoIcons
            ? additionalInfoIcons.map((icon, ind) => {
                return (
                  <AdditionalInfo
                    icon={icon.icon}
                    label={icon.label}
                    value={AdditionalInfoVals[ind]}
                    key={ind}
                  />
                );
              })
            : null}
        </div>
      </div>

      <div
        className={`w-full border-2 px-2 rounded-lg flex-wrap mt-12 mb-4
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
      >
        <div className="w-full">
          <p
            className={`text-2xl font-customFont p-2
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
          >
            Hourly Forecast
          </p>
        </div>
        <div>
          <WeatherHourly
            hourlyWeatherData={
              tomorrowHourlyWeather ? tomorrowHourlyWeather : null
            }
          />
        </div>
      </div>
    </section>
  );
};

export default WeatherTomorrow;
