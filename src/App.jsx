import { CityContextProvider } from "./contexts/CityContext";
import ThemeContextProvider from "./contexts/ThemeContext"
import Home from "./pages/Home"
import "./index.css"

function App() {
  return (
    <>
      <CityContextProvider>
        <ThemeContextProvider>
          <section>
            <Home />
          </section>
        </ThemeContextProvider>
      </CityContextProvider>
    </>
  );
}

export default App
