//? React imports
import { useContext, useState } from "react";
import { themeContext } from "../contexts/ThemeContext.jsx";

//? Ant design components imports
import { Input, 
        Switch, 
        Avatar } from "antd";
//? Ant design icons imports
import { MoonOutlined,
         SunOutlined,
         SearchOutlined } from "@ant-design/icons";
import { CityContext } from "../contexts/CityContext.jsx";

const Header = () => {

    const {theme, setTheme} = useContext(themeContext)
    const handleChange = () => setTheme(theme === "light" ? "dark" : "light")

    const [inputValue, setInputValue] = useState('')
    const {city, setCity} = useContext(CityContext)
    const handleSearch = (inputValue) => setCity(inputValue);
    

  return (
    <section className="flex justify-between items-center ">
      <Input
        placeholder="Search Cities"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={()=> handleSearch(inputValue)}
        prefix={<SearchOutlined />}
        className={`w-4/5 bg-transparent hover:bg-transparent text-sub border-sub text-xl placeholder:text-sub py-2`}
      />

      <Switch
        checkedChildren={<MoonOutlined className="text-xl" />}
        unCheckedChildren={<SunOutlined className="text-xl" />}
        defaultChecked
        onChange={handleChange}
        size="default"
      />

      <Avatar
        size="large"
        className={`${
          theme === "dark" ? "border-sub" : "border-black"
        } border-2`}
      />
    </section>
  );
};

export default Header;