//? Hooks imports
import { useContext } from "react";
import { Spin } from "antd";
import {LoadingOutlined} from "@ant-design/icons";

//? Local components imports
import Header from "../sections/Header";
import { themeContext } from "../contexts/ThemeContext";
import WeatherTabs from "../sections/WeatherTabs";
import { WeatherContext } from "../contexts/WeatherContext";

const Weather = () => {

  const {theme} = useContext(themeContext)
  const {loading} = useContext(WeatherContext)

  return (
    <section
      className={`w-screen flex customFont overflow-scroll
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >
      {loading ? (
        <div className="h-screen min-w-[91dvw] flex justify-center items-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div className="h-screen max-w-[91dvw]">
          <div className="w-full py-6 px-4">
            <Header />
          </div>

          <div className="w-full pl-4">
            <WeatherTabs />
          </div>
        </div>
      )}
    </section>
  );
}

export default Weather