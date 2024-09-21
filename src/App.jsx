import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider, { themeContext } from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuSec from "./sections/Menu"
import Home from "./pages/Home";
import Cities from "./pages/Cities"
import Map from "./pages/Maps" 
import Settings from "./pages/settings";
import Profile from "./pages/Profile"
import "./index.css";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>
      <WeatherContextProvider>
        <ThemeContextProvider>
          <Routes>
            <MenuSec />
            <Route index path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
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
