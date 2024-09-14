import { useContext } from "react";
import { CityContext } from "../contexts/CityContext";

const Weather = () => {

  const {city, setCity, img, temp, desc} = useContext(CityContext)
  console.log(img);
  

  return (
    <section className="testBorder flex items-center justify-between">
      <div className="testBorder2 w-2/4 flex text-sub customFont">
        <div className="w-2/4">
          <div className="testBorder3 w-full py-8 flex flex-col items-start justify-start">
            <p className="text-5xl mb-4">
              {city[0].toUpperCase() + city.slice(1)}
            </p>
            <p className="text-lg">{desc[0].toUpperCase() + desc.slice(1)}</p>
          </div>
          <div className="w-full flex justify-start items-center">
            <p className="text-9xl">{temp}</p>
            <span className="text-5xl mb-auto">{"\u00B0"}</span>
          </div>
        </div>

        <div className="testBorder3 w-2/4 flex items-center justify-center">
          <img src={img} alt="" className="w-80 h-80" />
        </div>
      </div>

      <div className="w-2/4 h-48 testBorder3"></div>
    </section>
  );
}

export default Weather