import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import { humidityGif } from "../../assets/gifs/gifs";
import { WeatherIcon } from "../../components/WeatherIcon";
import { WeatherData } from "../../components/WeatherData";
import { AdditionalInfo } from "../../components/AdditionalInfo";

const WeatherToday = () => {
  return (
    <section className="testBorder flex items-center justify-between">
      <div className="testBorder2 w-2/4 flex text-sub customFont">
        <WeatherData />
        <div className="testBorder3 w-2/4 flex items-center justify-center">
          <WeatherIcon />
        </div>
      </div>

      <div className="testBorder3 w-2/4 h-full flex flex-wrap justify-around items-center">
        <AdditionalInfo pic={humidityGif} />
        <AdditionalInfo pic={humidityGif} />
        <AdditionalInfo pic={humidityGif} />
        <AdditionalInfo pic={humidityGif} />
        <AdditionalInfo pic={humidityGif} />
        <AdditionalInfo pic={humidityGif} />
      </div>
    </section>
  );
};

export default WeatherToday;
