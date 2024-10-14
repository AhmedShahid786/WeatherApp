import  { useContext, useEffect, useState } from "react";
import { XAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { WeatherContext } from "../../contexts/WeatherContext";
import DataTabs from "../../components/DataTabs";

export default function WeatherWeekly() {
  const { weeklyWeather } = useContext(WeatherContext);
  const [currentDataKey, setCurrentDataKey] = useState("temperature");
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
  const currentMonth = monthsArr[date.getMonth()];
  let data = [];
  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      data.push({
        date: currentMonth + " " + (date.getDate() + (i + 1)),
        temperature: weeklyWeather.temperature[i],
        humidity: weeklyWeather.humidity[i],
        wind: weeklyWeather.wind[i],
        pressure: weeklyWeather.pressure[i],
        sunrise: weeklyWeather.sunrise[i],
        sunset: weeklyWeather.sunset[i],
      });
    }
    console.log(data);
  }, [weeklyWeather]);

  return (
    <section className="w-[90dvw]">
      <div className="h-80 w-full pr-4">
        <DataTabs handleCurrentDataKey={handleCurrentDataKey} currentDataKey={currentDataKey}/>
        <ResponsiveContainer className="!w-full !h-full mt-4">
          <BarChart className={`h-[500px] !w-full p-0 ml-0 mt-8`} data={data}>
            <XAxis dataKey="date" />
            <Bar dataKey={currentDataKey} fill="#00FFF5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
