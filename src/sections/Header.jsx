//? React imports
import { useContext, useState, useEffect } from "react";
import { themeContext } from "../contexts/ThemeContext.jsx";

//? Firebase SDks imports
import { auth, db } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

//? UI components imports
import { Input, Avatar } from "antd";
import { MoonOutlined, SunOutlined, SearchOutlined } from "@ant-design/icons";
import { WeatherContext } from "../contexts/WeatherContext.jsx";
import { useNavigate } from "react-router";

const Header = () => {
  const { theme, setTheme } = useContext(themeContext);
  const handleChange = () => setTheme(theme === "light" ? "dark" : "light");

  const [inputValue, setInputValue] = useState("");
  const { city, setCity } = useContext(WeatherContext);
  const [src, setSrc] = useState("");
  const handleSearch = (inputValue) => setCity(inputValue);

  //? Initialize uid for referencing to each user's data in firestore-database
  let uid;
  //? Listener function to constantly check whether user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        uid = user.uid;
        fetchImage(uid);
      }
    });

    return () => unsubscribe(); //* Unsubscribe when component unmounts
  }, []);

  //? Fetch cities saved by the user
  const fetchImage = async (uid) => {
    try {
      const imageRef = doc(db, "weatherApp", uid);
      const imageRaw = await getDoc(imageRef);
      const imageSrc = imageRaw.data().profilePicUrl;
      setSrc(imageSrc);
    } catch (err) {
      console.log("error in fetching cities", err);
    }
  };

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/profile")
  }

  return (
    <section className="flex justify-around sm:justify-between items-center">
      <div
        className={`sm:w-4/5 w-4/6 flex bg-transparent !font-customFont hover:bg-transparent active:bg-transparent 
        focus:border-thirdD focus:border-2 focus:outline-none rounded-lg text-xl placeholder:text-sub 
        py-2 border-2 placeholder:text-fourthD font-customFont
          ${
            theme === "dark"
              ? "border-thirdD text-fourthD"
              : "border-thirdL text-fourthL"
          } pl-4 gap-2`}
      >
        <SearchOutlined />
        <input
          type="text"
          placeholder="Search Cities"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
          className={`w-full bg-transparent !font-customFont hover:bg-transparent active:bg-transparent 
         focus:outline-none rounded-lg text-xl placeholder:text-sub
        placeholder:text-fourthD font-customFont
          ${
            theme === "dark"
              ? "border-thirdD text-fourthD"
              : "border-thirdL text-fourthL"
          }`}
        />
      </div>

      <Avatar
        size="large"
        className={`cursor-pointer border-2 flex items-center justify-center
          ${theme === "dark" ? "border-thirdD" : "border-thirdL"}`}
        src={
          theme === "dark" ? (
            <SunOutlined className="text-fourthD w-4" />
          ) : (
            <MoonOutlined className="text-fourthL w-4" />
          )
        }
        onClick={handleChange}
      />

      <Avatar
        src={src}
        onClick={handleNavigate}
        size="large"
        className={`${
          theme === "dark" ? "border-thirdD" : "border-thirdL"
        } border-2 cursor-pointer`}
      />
    </section>
  );
};

export default Header;
