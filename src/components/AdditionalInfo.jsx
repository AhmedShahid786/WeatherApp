import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";


export const AdditionalInfo = ({pic, label, value}) => {
  return (
    <div className="testBorder w-2/4 flex mb-4 mt-4">
      <div className="w-1/4 flex justify-end">
        <img src={pic} alt="" className="w-20 h-20" />
      </div>
      <div className="testBorder2 w-3/4 flex flex-col justify-around items-start text-sub">
        <p className="opacity-60 text-lg">{label}</p>
        <p className="text-4xl">{value}</p>
      </div>
    </div>
  );
}
