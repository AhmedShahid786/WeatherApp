//? Hooks imports
import { useContext, useEffect } from "react";

//? UI components imports
import { Spin, message } from "antd";
import {LoadingOutlined} from "@ant-design/icons";

//? Local components imports
import Header from "../sections/Header";
import { themeContext } from "../contexts/ThemeContext";
import WeatherTabs from "../sections/WeatherTabs";
import { WeatherContext } from "../contexts/WeatherContext";

const Weather = () => {
  const { theme } = useContext(themeContext);
  const { loading, locationRequest } = useContext(WeatherContext);

  //? State to display popover message componenet by antDesign
  const [messageApi, contextHolder] = message.useMessage();

  //? Function to show error message popup
  const errorPopup = (errorCode) => {
    messageApi.open({
      type: "error",
      content: errorCode,
    });
  };

  //? UseEffect to show the error popup only when locationRequest changes
  useEffect(() => {
    if (locationRequest) {
      errorPopup(
        "Please allow location access to view your location's weather"
      );
    }
  }, [locationRequest]);

  return (
    <section
      className={`w-screen flex customFont overflow-scroll
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >
      {/* Necessary to include it in order to show popup messages */}
      {contextHolder}

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