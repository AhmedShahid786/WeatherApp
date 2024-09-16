import { WeatherContextProvider } from "./contexts/WeatherContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <>
      <WeatherContextProvider>
        <ThemeContextProvider>
          <section>
            <Home />
          </section>
        </ThemeContextProvider>
      </WeatherContextProvider>
    </>
  );
}

export default App;
