import { createContext, useState } from "react";

export const themeContext = createContext()

//? Check for user's default set theme
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

function ThemeContextProvider({children}){
    const [theme, setTheme] = useState(defaultTheme)

    return(
        <themeContext.Provider value={{theme, setTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeContextProvider