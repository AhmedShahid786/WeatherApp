//? Hooks imports
import { useState } from "react";

//? Local components imports
import Header from "../sections/Header";
import MenuSec from "../sections/Menu"
import Weather from "../sections/Weather";
import WeatherTabs from "../sections/WeatherTabs";

const Home = () => {

  

  return (
    <section className="w-screen h-screen flex bg-[#0B131E] customFont">
      <div className="h-full bg-[#001529]">
        <MenuSec />
      </div>

      <div className="h-screen w-full">
        <div className="w-full p-6">
          <Header />
        </div>

        <div className="w-full pl-6">
          <WeatherTabs/>
        </div>

      </div>
    </section>
  );
}

export default Home