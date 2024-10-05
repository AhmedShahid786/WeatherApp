import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export const AdditionalInfo = ({ icon, label, value }) => {
  const { theme } = useContext(themeContext);

  return (
    <div className=" w-2/4 flex mb-4 mt-4">
      <div className="w-1/4 flex items-center justify-center">
        <img src={icon} alt="" className="w-8 h-8 mt-2" />
      </div>
      <div className="w-3/4 flex flex-col justify-around items-start text-sub">
        <p
          className={`text-base
            ${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
        >
          {label}
        </p>
        <p
          className={`text-3xl
              ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
        >
          {value}
          {label.includes("Feels Like") ? (
            <span
              className={`text-4xl mb-auto
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
