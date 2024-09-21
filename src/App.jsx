import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider, { themeContext } from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuSec from "./sections/Menu"
import Home from "./pages/Weather";
import Cities from "./pages/Cities"
import Map from "./pages/map";
import Settings from "./pages/settings";
import Profile from "./pages/Profile"
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <WeatherContextProvider>
        <ThemeContextProvider>
            <MenuSec />
          <Routes>
            <Route index path="/weather" element={<Home/>}/>
            <Route path="/cities" element={<Cities/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </ThemeContextProvider>
      </WeatherContextProvider>
    </BrowserRouter>
  );
}

export default App;
