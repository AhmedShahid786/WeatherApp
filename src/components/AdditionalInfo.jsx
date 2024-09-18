import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export const AdditionalInfo = ({pic, label, value}) => {

  const {theme} = useContext(themeContext)

  return (
    <div className="testBorder w-2/4 flex mb-4 mt-4">
      <div className="w-1/4 flex justify-end">
        <img src={pic} alt="" className="w-20 h-20" />
      </div>
      <div className="testBorder2 w-3/4 flex flex-col justify-around items-start text-sub">
        <p
          className={`opacity-60 text-base
          ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          {label}
        </p>
        <p
          className={`text-3xl
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
