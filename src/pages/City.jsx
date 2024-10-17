//? Hooks imports
import { useContext, useEffect, useState } from "react";
import { themeContext } from "../contexts/ThemeContext";

//? Firebase  SDK imports
import { auth, db } from "../utils/firebaseConfig";
import { onAuthStateChanged  } from "firebase/auth";        
import { doc, getDoc, setDoc } from "firebase/firestore";

//? UI components imports
import { CityListItem } from "../components/CityListItem";
import Spline from "@splinetool/react-spline";
import { ArrowRightOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Input,
} from "@headlessui/react";
import { Link } from "react-router-dom";

function City() {
  //? Import theme state from context
  const { theme } = useContext(themeContext);

  //? Loading state to display spinner for better UX
  const [loading, setLoading] = useState(false);

  //? Cites state to store all the cities saved by the user
  const [savedCities, setSavedCities] = useState([]);

  //? Input state to manage adding a city
  const [inputValue, setInputValue] = useState("");

  //? States for firebase
  const [userDoc, setUserDoc] = useState(false);
  const [userId, setUserId] = useState("");
  const [isUser, setIsUser] = useState(false)

  //? Initialize uid for referencing to each user's data in firestore-database
  let uid;

  //? Listener function to constantly check whether user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        uid = user.uid;
        setIsUser(true)
        setUserId(uid);
        fetchCities(uid);
      }
    });

    return () => unsubscribe(); //* Unsubscribe when component unmounts
  }, []);

  //? Fetch cities saved by the user
  const fetchCities = async (uid) => {
    setLoading(true)
    try {
      const citiesRef = doc(db, "weatherApp", uid);
      const citiesRaw = await getDoc(citiesRef);
      const citiesData = citiesRaw.data().savedCities.cities;
      setSavedCities(citiesData);
      setUserDoc(citiesRaw.data());
      console.log("citiesData =>", citiesData);
      setLoading(false)
    } catch (err) {
        console.log("error in fetching cities", err);
        setLoading(false)
    }
  };

  //? Handle Submit
  const handleSubmit = async () => {
    if (inputValue.trim() !== "") {
      const updatedCities = [...savedCities, inputValue.toLowerCase().trim()];

      //* Update the user object with the new city
      const updatedUserDoc = {
        ...userDoc,
        savedCities: {
          total: updatedCities.length, // Now it's correct
          cities: updatedCities, // Updated cities array
        },
      };

      //* Reference to the user's document
      const userDocRef = doc(db, "weatherApp", userId);
      try {
        //* Update Firestore with the new user document
        await setDoc(userDocRef, updatedUserDoc);

        //* Clear the input and update state
        setInputValue("");
        setIsOpen(false);
        fetchCities(userId)
      } catch (err) {
        console.error("Error updating document", err);
      }
    }
  };

  //? Handle deleting a city
  const handleCityDelete = async (cityToDelete) => {
    //* Filter out the city that needs to be deleted
    const updatedCities = savedCities.filter((city) => city !== cityToDelete);

    //* Update the user document with the new city list and total
    const updatedUserDoc = {
      ...userDoc,
      savedCities: {
        total: updatedCities.length,
        cities: updatedCities,
      },
    };

    //* Reference to the user's document in Firestore
    const userDocRef = doc(db, "weatherApp", userId);

    try {
      //* Update Firestore with the new user document
      await setDoc(userDocRef, updatedUserDoc);

      //* Update local state with the new cities array
      fetchCities(userId)
      console.log(`${cityToDelete} deleted successfully`);
    } catch (err) {
      console.error("Error deleting city from Firestore", err);
    }
  };

  //? State to open and close dialogBox
  let [isOpen, setIsOpen] = useState(false);

  //? Open dialog on button click
  const showDialog = () => {
    setIsOpen(true);
  };

  return (
    <section className="h-screen w-screen flex">
      {/* Main Div */}
      <div className="h-full w-full flex">
        {/* Add Citites Div */}
        <div className="w-1/2 h-full flex flex-col justify-evenly items-center  bg-black">
          {/* Header Div */}
          <div className="w-5/6 h-1/6 flex justify-between items-center">
            <p
              className={`text-5xl font-customFont
          ${theme === "dark" ? "text-fourthD" : "text-fourthL"}
          `}
            >
              Cities
            </p>
            {/* Open Cities Input Popover */}
            <button
              onClick={showDialog}
              className={`text-base font-customFont border-2 p-2 rounded-lg
          ${
            theme === "dark"
              ? "text-fourthD border-fourthD"
              : "text-fourthL border-fourthL"
          }
          `}
            >
              <PlusOutlined /> Add City
            </button>

            {/* Modal centered on the screen */}
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              {/* If user is logged in then show input otherwise show link to signup page */}
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                {isUser ? (
                  <DialogPanel
                    className={`w-96 space-y-4 bg-black p-4 border-2 rounded-xl ${
                      theme === "dark"
                        ? "text-thirdD border-fourthD"
                        : "text-thirdL border-fourthL"
                    }`}
                  >
                    <DialogTitle className="font-customFont text-xl">
                      Enter A City Name
                    </DialogTitle>
                    <Description>
                      <Input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        className={`w-full bg-transparent font-customFont px-2 py-1 rounded-lg text-md border-2 ${
                          theme === "dark"
                            ? "text-thirdD border-fourthD"
                            : "text-thirdL border-fourthL"
                        }`}
                      />
                    </Description>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className={`border-2 px-2 text-md py-1 rounded-lg ${
                          theme === "dark"
                            ? "text-thirdD border-fourthD"
                            : "text-thirdL border-fourthL"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className={`border-2 px-2 text-md py-1 rounded-lg ${
                          theme === "dark"
                            ? "text-thirdD border-fourthD"
                            : "text-thirdL border-fourthL"
                        }`}
                      >
                        Add
                      </button>
                    </div>
                  </DialogPanel>
                ) : (
                  <DialogPanel
                    className={`w-96 space-y-4 bg-black p-4 border-2 rounded-xl ${
                      theme === "dark"
                        ? "text-thirdD border-fourthD"
                        : "text-thirdL border-fourthL"
                    }`}
                  >
                    <DialogTitle className="font-customFont text-xl">
                      Please login to add city
                    </DialogTitle>
                    <button
                      className={`border-2 px-2 text-base py-1 rounded-lg ${
                        theme === "dark"
                          ? "text-thirdD border-fourthD"
                          : "text-thirdL border-fourthL"
                      }`}
                    >
                      <Link to={"/profile"}>Go to login page</Link>
                      <ArrowRightOutlined className="text-base ml-1" />
                    </button>
                  </DialogPanel>
                )}
              </div>
            </Dialog>
          </div>

          {/* If loading then show loading icon else show content */}
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
              size="small"
            />
          ) : (
            <div
              className={`w-5/6 h-4/6 flex flex-col items-center justify-start p-2 overflow-scroll`}
            >
              {savedCities?.map((cityName, ind) => (
                <CityListItem
                  key={ind}
                  city={cityName}
                  handleCityDelete={handleCityDelete}
                />
              ))}
            </div>
          )}
        </div>
        {/* Spline Div */}
        <div className="w-1/2 h-full bg-black">
          <Spline scene="https://prod.spline.design/B9gCGFUsdCoKNFqb/scene.splinecode" />
        </div>
      </div>
    </section>
  );
}

export default City;