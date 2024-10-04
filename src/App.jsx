import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./pages/Weather";
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
          <Routes>
            <Route index path="/" element={<Weather/>}/>
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
