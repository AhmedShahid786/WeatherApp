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
    <section className="testBorder flex items-center justify-between">
      <div className="testBorder2 w-2/4 flex text-sub customFont">
        <WeatherData />
        <div className="testBorder3 w-2/4 flex items-center justify-center">
          <WeatherIcon />
        </div>
      </div>

      <div className="testBorder3 w-2/4 h-full flex flex-wrap justify-around items-center">
        {gifs.map((gif, ind)=>{
          console.log(AdditionalInfoVals[ind]);
          
          return(
          <AdditionalInfo pic={gif.gif} label={gif.label} value={AdditionalInfoVals[ind]}/>
          )
        })}
      </div>
    </section>
  );
};

export default WeatherToday;
