import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import gifs from "../../assets/gifs/gifs"
import { WeatherIcon } from "../../components/WeatherIcon";
import { WeatherData } from "../../components/WeatherData";
import { AdditionalInfo } from "../../components/AdditionalInfo";

const WeatherToday = () => {
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
    <section className="testBorder flex flex-col items-center justify-center">
      <div className="flex w-full">
        <div className="testBorder2 w-2/4 flex text-sub customFont">
          <WeatherData />
          <div className="testBorder3 w-2/4 flex items-center justify-center">
            <WeatherIcon />
          </div>
        </div>

        <div className="testBorder3 w-2/4 h-full flex flex-wrap justify-around items-center">
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

      <div className="testBorder3 w-full">
        <p className="text-sub text-xl opactiy-50">Hourly Forecast</p>

        <div className="testBorder2 w-full">
          <div className="testBorder w-36 h-40 flex flex-col justify-center items-center mt-2 mr-2 text-sub">
            <p>6:00</p>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.img}@2x.png`}
              alt=""
              className="w-20 h-20"
            />
            <p className="text-4xl">21</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherToday;
