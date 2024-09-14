import { createContext, useState, useEffect } from "react";

export const CityContext = createContext()

export const CityContextProvider = ({children}) => {
    const [city, setCity] = useState("Karachi")
    const [img, setImg] = useState("")
    const [temp, setTemp] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f258d4a7f76f264d7ac94454d85a6dc2`)
        .then(res => res.json()
        .then((res) => {
          console.log(res);
          const iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
          setImg(iconUrl)
          setTemp(Math.round(res.main.temp - 273.15));
          setDesc(res.weather[0].description.toLowerCase())
        })
      )
    }, [city])
    
  return (
    <CityContext.Provider value={{city, setCity, img, temp, desc}}>
        {children}
    </CityContext.Provider>
  )
}
