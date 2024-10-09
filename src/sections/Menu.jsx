//? All hooks are imported here
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

//? Context imports
import { themeContext } from "../contexts/ThemeContext";
import { citiesIcon, cloudD, mapIcon, menuIcon, profileIcon, settingsIcon } from "../assets/icons/icons";
import { Link } from "react-router-dom";

//? Ant design imports

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
    path: "cities",
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
    path : "/profile"
  },
  {
    key: "4",
    icon: settingsIcon,
    label: "Settings",
    path: "/settings",
  },
];


const Menu = () => {

    const {theme} = useContext(themeContext)

    const navigate = useNavigate()
    const handleClick = (e)=>{
       const selectedItem = items.find((item) => item.key === e.key);
       if (selectedItem) {
         navigate(selectedItem.path);
       }
    }

  //? AntD Component Code
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={`h-full w-[9dvw] flex flex-col items-center justify-start bg-transparent`}
    >
      <div className="w-full h-1/6 flex items-center justify-center">
        <img src={menuIcon} alt="" className="h-8 w-8 cursor-pointer" />
      </div>

      <div className="w-full h-4/6 flex flex-col items-center justify-evenly">
        {items.map((item) => (
          <Link to={item.path} key={item.key} className="w-full flex flex-col items-center justify-center">
            <img src={item.icon} alt="" className="w-10 h-10" />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Menu;