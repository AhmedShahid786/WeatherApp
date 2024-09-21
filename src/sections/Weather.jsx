import { Tabs } from "antd";
import { useContext, useState } from "react";
import { themeContext } from "../contexts/ThemeContext";
import WeatherToday from "./subSections/WeatherToday";


const Weather = () => {
  const {theme} = useContext(themeContext)
  
  const [activeKey, setActiveKey] = useState("1");
  
  const items = [
    {
      key: "1",
      label: (
        <span style={{ color: activeKey === "1" ? "#00FFF5" : "#FF2E63"  }}>
          Today
        </span>
      ),
      children: <WeatherToday />,
    },
    {
      key: "2",
      label: (
        <span style={{ color: activeKey === "2" ? "#00FFF5" : "#FF2E63"  }}>
          Tomorrow
        </span>
      ),
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: (
        <span style={{ color: activeKey === "3" ? "#00FFF5" : "#FF2E63"  }}>
          Next 7 Days
        </span>
      ),
      children: "Content of Tab Pane 3",
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      className={
        theme === "dark"
          ? "custom-tabsD ant-tabs-tab-btn"
          : "custom-tabsL ant-tabs-tab-btn"
      }
      items={items}
      tabBarStyle={{ marginBottom: 0 }}
    />
  );
};

export default Weather;
