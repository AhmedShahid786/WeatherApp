//? All hooks are imported here
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

//? Context imports
import { themeContext } from "../contexts/ThemeContext";

//? Ant design imports
import {
  AntCloudOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

//? Menu Items
const items = [
  {
    key: "1",
    icon: (
      <AntCloudOutlined
        className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`}
      />
    ),
    label: "Weather",
    path: "/",
  },
  {
    key: "2",
    icon: (
      <UnorderedListOutlined
        className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`}
      />
    ),
    label: "Cities",
    path: "cities",
  },
  {
    key: "3",
    icon: (
      <EnvironmentOutlined
        className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`}
      />
    ),
    label: "Map",
    path: "/map",
  },
  {
    key: "4",
    icon: (
      <SettingOutlined
        className={`mr-4 !text-2xl 
      "!mt-2
      !ml-[-4px]`}
      />
    ),
    label: "Settings",
    path: "/settings",
  },
  {
    key: "5",
    icon: (
      <UserOutlined
        className={`mr-4 !text-2xl 
      "!mt-2
      !ml-[-4px]`}
      />
    ),
    label: "Profile",
    path : "/profile"
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
          <div className={`border h-full w-[9dvw] flex flex-col gap-4 items-center justify-center bg-transparent`}>
            <div></div>
          </div>  
  );
}
export default Menu;