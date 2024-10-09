//? Hooks imports
import { useContext } from "react";

//? Local components imports
import Header from "../sections/Header";
import { themeContext } from "../contexts/ThemeContext";
import WeatherTabs from "../sections/WeatherTabs";

const Weather = () => {

  const {theme} = useContext(themeContext)

  return (
    <section
      className={`w-screen flex customFont overflow-scroll
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >
      <div className="h-screen max-w-[91dvw]">
        <div className="w-full py-6 px-4">
          <Header />
        </div>

        <div className="w-full pl-4">
          <WeatherTabs />
        </div>
      </div>
    </section>
  );
}

export default Weather