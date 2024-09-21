//? Hooks imports
import { useContext } from "react";

//? Local components imports
import Header from "../sections/Header";
import Weather from "../sections/WeatherTabs";
import { themeContext } from "../contexts/ThemeContext";

function Home () {

  const {theme} = useContext(themeContext)

  return (
    <section
      className={`w-screen h-screen flex customFont
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}
    `}
    >

      <div className="h-screen max-w-[91dvw]">
        <div className="w-full p-6">
          <Header />
        </div>

        <div className="w-full pl-6">
          <Weather/>
        </div>
      </div>
    </section>
  );
}

export default Home