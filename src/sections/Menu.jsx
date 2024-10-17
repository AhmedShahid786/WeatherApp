//? Hooks imports
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

//? Context imports
import { themeContext } from "../contexts/ThemeContext";
import {
  citiesIcon,
  cloudD,
  mapIcon,
  profileIcon,
  thunderRain,
} from "../assets/icons/icons";

//? Menu Items
const items = [
  {
    key: "1",
    icon: cloudD,
    label: "Weather",
    path: "/",
  },
  {
    key: "2",
    icon: citiesIcon,
    label: "Cities",
    path: "/cities",
  },
  {
    key: "3",
    icon: mapIcon,
    label: "Map",
    path: "/map",
  },
  {
    key: "5",
    icon: profileIcon,
    label: "Profile",
    path: "/profile",
  }
];

const Menu = () => {
  const { theme } = useContext(themeContext);
  const location = useLocation(); 

  return (
    <div
      className={`h-full w-[9dvw] flex flex-col items-center justify-start bg-transparent border-r-2
        ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
    >
      <div className="w-full h-1/6 flex items-center justify-center">
        <img
          src={thunderRain}
          alt=""
          className="h-16 w-16 mt-6 cursor-pointer"
        />
      </div>

      <div className="w-full h-4/6 flex flex-col items-center justify-center gap-6 my-auto">
        {items.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={`w-4/6 flex flex-col items-center justify-center
              ${
                location.pathname === item.path
                  ? "border-2 border-thirdD rounded-lg py-2"
                  : ""
              }`}
          >
            <img src={item.icon} alt="" className="w-8 h-8" />
            <p
              className={`font-customFont leading-none text-xs
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}`}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Menu;
