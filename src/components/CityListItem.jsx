import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export const CityListItem = ({city, handleCityDelete}) => {

    const {theme} = useContext(themeContext)

  return (
    <div
      className={`w-5/6 px-2 py-3 my-2 rounded-lg border-2 ${
        theme === "dark" ? "border-thirdD" : "border-thirdL"
      }`}
    >
      <div
        className={`text-2xl font-customFont
                 ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
      >
        {city ? city[0].toUpperCase() + city.slice(1) : ""}
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <button
        onClick={() => handleCityDelete(city)}
          className={`border-2 px-2 text-base py-1 rounded-lg ${
            theme === "dark"
              ? "text-fourthD border-thirdD"
              : "text-fourthL border-thirdL"
          }`}
        >
          Delete
        </button>
        <button
          className={`border-2 px-2 text-base py-1 rounded-lg ${
            theme === "dark"
              ? "text-fourthD border-thirdD"
              : "text-fourthL border-thirdL"
          }`}
        >
          View Weather
        </button>
      </div>
    </div>
  );
}
