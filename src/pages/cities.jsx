//? Hooks imports
import { useContext, useEffect, useState } from "react";
import { themeContext } from "../contexts/ThemeContext";

//? Libraries' imports
import Spline from "@splinetool/react-spline";
import { PlusOutlined } from "@ant-design/icons";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Input,
} from "@headlessui/react";
import { CityListItem } from "../components/CityListItem";

export const Cities = () => {
      const { theme } = useContext(themeContext);

      //? Cites state to store all the cities saved by the user
      const [savedCities, setSavedCities] = useState([]);

      useEffect(() => console.log("savedCities", savedCities), [savedCities]);
      //?
      const [inputValue, setInputValue] = useState("");

      //? Handle Submit
      const handleSubmit = () => {
        if (inputValue.trim() !== "") {
          const arr = [...savedCities];
          setSavedCities([...arr, inputValue.toLowerCase()]);
          setInputValue("");
          setIsOpen(false);
        }
      };

      //? Handle deleting a city
      const handleCityDelete = (city) => {
        const updatedCities = savedCities.filter((city) => city !== city);
        setSavedCities(updatedCities);
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
                  <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
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
                          onChange={(event) =>
                            setInputValue(event.target.value)
                          }
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
                  </div>
                </Dialog>
              </div>

              {/* Cities List Div */}
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
            </div>
            {/* Spline Div */}
            <div className="w-1/2 h-full bg-black">
              <Spline scene="https://prod.spline.design/B9gCGFUsdCoKNFqb/scene.splinecode" />
            </div>
          </div>
        </section>
      );
};
