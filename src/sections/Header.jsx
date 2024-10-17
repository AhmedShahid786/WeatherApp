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
    <section className="flex justify-between items-center ">
      <Input
        placeholder="Search Cities"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={() => handleSearch(inputValue)}
        prefix={
          <SearchOutlined
            className={`${theme === "dark" ? "text-thirdD" : "text-thirdL"}`}
          />
        }
        className={`w-4/5 bg-transparent hover:bg-transparent active:bg-transparent text-xl placeholder:text-sub py-2 border-2
          ${
            theme === "dark"
              ? "border-thirdD text-fourthD"
              : "border-thirdL text-fourthL"
          }
          `}
      />

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
