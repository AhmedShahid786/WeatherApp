//? Hooks imports
import  { useContext, useEffect, useState } from "react";

//? UI components imports
import { XAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

//? Local imports
import { WeatherContext } from "../../contexts/WeatherContext";
import DataTabs from "../../components/DataTabs";

export default function WeatherWeekly() {
  //? Imoport weekly weather data from context
  const { weeklyWeather } = useContext(WeatherContext);

  //? CurrentDataKey state to handle which data to show in chart
  const [currentDataKey, setCurrentDataKey] = useState("temperature");

  //? Data state to store weather data for the chart
  const [data, setData] = useState([]);

  //? Update currentDataKey on clicking another data key
  const handleCurrentDataKey = (dataKey) => {
    setCurrentDataKey(dataKey);
    console.log(currentDataKey);
  };

  const date = new Date();
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //? Fetch current month to display x-axis labels with currentMonth-date
  const currentMonth = monthsArr[date.getMonth()];

  const updatedData = []
  //? Push data to array
  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      updatedData.push({
        date: currentMonth + " " + (date.getDate() + (i + 1)),
        temperature: weeklyWeather.temperature[i],
        humidity: weeklyWeather.humidity[i],
        wind: weeklyWeather.wind[i],
        pressure: weeklyWeather.pressure[i],
        sunrise: weeklyWeather.sunrise[i],
        sunset: weeklyWeather.sunset[i],
      });
    }
    setData(updatedData);
  }, [weeklyWeather]);

  const dataTabs = [
    "Temperature",
    "Humidity",
    "Wind",
    "Pressure",
    "Sunrise",
    "Sunset",
  ];

  return (
    <section className="w-[90dvw]">
      <div className="h-80 w-full pr-4">
        <DataTabs
          data={dataTabs}
          handleCurrentDataKey={handleCurrentDataKey}
          currentDataKey={currentDataKey}
        />
        <ResponsiveContainer className="!w-full !h-full mt-4">
          <BarChart className={`h-[500px] !w-full p-0 ml-0 mt-8`} data={data}>
            <XAxis dataKey="date" />
            <Bar dataKey={currentDataKey} fill="#00FFF5" />
          </BarChart>
        </ResponsiveContainer>
        ;
      </div>
    </section>
  );
}
