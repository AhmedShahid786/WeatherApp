//? Hooks imports
import  { useContext, useEffect, useState } from "react";

//? UI components imports
import { XAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";

//? Local imports
import { WeatherContext } from "../../contexts/WeatherContext";
import DataTabs from "../../components/DataTabs";

import "../../index.css"

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
          <BarChart className={`h-[500px] !w-full p-0 ml-0 mt-8`} data={data ? data : null}>
            <XAxis dataKey="date" tick={{ fill: "#FF2E63" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                borderRadius: "8px",
                border: "2px solid #FF2E63",
              }}
              labelStyle={{ color: "#FF2E63" }}
              itemStyle={{ color: "#00FFF5" }}
            />
            <Bar
              dataKey={currentDataKey}
              fill="#00FFF5"
              stroke="#FF2E63"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
