import { Outlet } from "react-router";
import Menu from "../sections/Menu";
import { useContext } from "react";
import { themeContext } from "../contexts/ThemeContext";

export default function RootLayout() {

  const {theme} = useContext(themeContext)

  return (
    <div
      className={`w-screen h-screen overflow-scroll flex max-sm:flex-col-reverse max-sm:items-center max-sm:justify-center
    ${theme === "light" ? "bg-firstL" : "bg-firstD"}`}
    >
      <div className="w-full sm:max-w-max h-full max-sm:h-[10dvh] max-sm:mb-4 z-30 flex items-center justify-center">
        <Menu />
      </div>
      <Outlet />
    </div>
  );
}
