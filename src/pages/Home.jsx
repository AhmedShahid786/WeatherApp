//? Hooks imports
import { useContext } from "react";

//? Local components imports
import Header from "../sections/Header";
import MenuSec from "../sections/Menu"
import Weather from "../sections/subSections/WeatherToday";
import { themeContext } from "../contexts/ThemeContext";

const Home = () => {

  const {theme} = useContext(themeContext)

  return (
    <section
      className={`w-screen h-screen flex customFont
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >
      <div
        className={`h-full 
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}`}
      >
        <MenuSec />
      </div>

      <div className="h-screen w-full">
        <div className="w-full p-6">
          <Header />
        </div>

        <div className="w-full pl-6">
          <Weather />
        </div>
      </div>
    </section>
  );
}

export default Home