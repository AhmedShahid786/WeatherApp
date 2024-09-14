//? React imports
import React, { useContext, useState } from "react";

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
import { themeContext } from "../contexts/ThemeContext";
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
    label: "Settings",
    icon: <SettingOutlined className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`} />,
  },
  {
    key: "5",
    label: "Profile",
    icon: <UserOutlined className={`mr-4 !text-2xl 
        "!mt-2
        !ml-[-4px]`} />,
  },
];


const App = () => {

    const {theme, setTheme} = useContext(themeContext)

  //? AntD Component Code
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="max-w-[256px] px-2 py-4 customFont">
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
        className="text-lg customFont"
      />
    </div>
  );
};
export default App;
