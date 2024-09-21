import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider, { themeContext } from "./contexts/ThemeContext";
import MenuSec from "./sections/Menu"
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <
    >
      <WeatherContextProvider>
        <ThemeContextProvider>
            <MenuSec />
          <section>
            <Home />
          </section>
        </ThemeContextProvider>
      </WeatherContextProvider>
    </>
  );
}

export default App;
