import { useContext } from "react";
import { CityContext } from "../../contexts/CityContext";

import { humidityGif } from "../../assets/gifs/gifs"
import { WeatherIcon } from "../../components/WeatherIcon";

const WeatherToday   = () => {
  const { city, setCity, img, temp, desc } = useContext(CityContext);

  return (
    <section className="testBorder flex items-center justify-between">
      <div className="testBorder2 w-2/4 flex text-sub customFont">
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
            <p className="text-9xl">{temp}</p>
            <span className="text-5xl mb-auto">{"\u00B0"}</span>
          </div>
        </div>

        <div className="testBorder3 w-2/4 flex items-center justify-center">
        <WeatherIcon/>
        </div>
      </div>

      <div className="testBorder3 w-2/4 h-full flex flex-wrap justify-start items-center">
      
      </div>
      
    </section>
  );
};

export default WeatherToday  ;
