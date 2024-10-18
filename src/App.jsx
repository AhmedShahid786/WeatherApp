import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./pages/Weather";
import Cities from "./pages/Cities";  
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import RootLayout from "./pages/RootLayout";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <WeatherContextProvider>
        <ThemeContextProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Weather />} />
              <Route path="cities" element={<Cities />} />
              <Route path="map" element={<Map />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </ThemeContextProvider>
      </WeatherContextProvider>
    </BrowserRouter>
  );
}

export default App;
