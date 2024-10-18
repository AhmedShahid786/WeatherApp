import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export const AdditionalInfo = ({ icon, label, value }) => {
  const { theme } = useContext(themeContext);

  return (
    <div className=" w-2/4 flex mb-4 mt-4">
      <div className="w-1/4 flex items-center justify-center">
        <img src={icon} alt="" className="w-8 h-8 sm:mt-2 mt-4 mr-2 sm:mr-0" />
      </div>
      <div className="w-3/4 flex flex-col justify-around items-start text-sub">
        <p
          className={`text-base
            ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          {label}
        </p>
        <p
          className={`sm:text-2xl text-xl font-customFont
              ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
        >
          {value}
          {label.includes("Feels Like") ? (
            <span
              className={`text-2xl mb-auto
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
            >
              {"\u00B0"}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};
