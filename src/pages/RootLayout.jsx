import { Outlet } from "react-router";
import Menu from "../sections/Menu";
import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export default function RootLayout() {

  const {theme} = useContext(themeContext)

  return (
    <div
      className={`w-screen h-screen flex
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}`}
    >
      <div className="max-w-max h-full z-30">
        <Menu />
      </div>
      <Outlet/>
    </div>
  );
}
