import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider, { themeContext } from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuSec from "./sections/Menu"
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <WeatherContextProvider>
        <ThemeContextProvider>
          <Routes>
            <MenuSec />
            <Route index path="/" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/cities" element={"a"}/>
          </Routes>
        </ThemeContextProvider>
      </WeatherContextProvider>
    </BrowserRouter>
  );
}

export default App;
