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
import { Button, Menu } from "antd";

//? Menu Items
const items = [
  {
    key: "1",
    icon: <AntCloudOutlined className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`} />,
    label: "Weather",
  },
  {
    key: "2",
    icon: <UnorderedListOutlined className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`} />,
    label: "Cities",
  },
  {
    key: "3",
    icon: <EnvironmentOutlined className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`} />,
    label: "Map",
  },
  {
    key: "4",
    icon: <SettingOutlined className={`mr-4 !text-2xl 
      "!mt-2
      !ml-[-4px]`} />,
      label: "Settings",
  },
  {
    key: "5",
    icon: <UserOutlined className={`mr-4 !text-2xl 
      "!mt-2
      !ml-[-4px]`} />,
      label: "Profile",
  },
];


const App = () => {

    const {theme} = useContext(themeContext)

    const navigate = useNavigate()
    const handleClick = (e)=>{
       const selectedItem = items.find((item) => item.key === e.key);
       if (selectedItem) {
         navigate(`/${selectedItem.label.toLowerCase()}`);
       }
    }

  //? AntD Component Code
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={`max-w-[256px] px-2 py-4 customFont
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className={`mr-4 mt-2 ml-1 text-2xl mb-4 px-6 customFont`}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        {/* <span className="text-lg">Menu</span> */}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme={theme}
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClick}
        className={`text-lg customFont
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}`}
      />
    </div>
  );
};
export default App;
