import { Tabs } from "antd";
import WeatherToday from "./subSections/WeatherToday";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Today",
    children: <WeatherToday />,
  },
  {
    key: "2",
    label: "Tomorrow",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Next 7 Days",
    children: "Content of Tab Pane 3",
  },
];

function Weather() {
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
  );
}

export default Weather;
