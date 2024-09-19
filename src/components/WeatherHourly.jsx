// import React from 'react'

// const WeatherHourly = ({time, img, temp}) => {
//   return (
//     <div>
//       <div className="w-36 h-40 flex flex-col justify-center items-center mt-2 mr-2 text-sub">
//         <p>{time}</p>
//         <img
//           src={`https://openweathermap.org/img/wn/${img}@2x.png`}
//           alt=""
//           className="w-20 h-20"
//         />
//         <p className="text-4xl">{temp ? Math.round(temp - 273.15) : ""}</p>
//       </div>
//     </div>
//   );
// }

// export default WeatherHourly

import { Card, Row, Col } from "antd";
import { useEffect, useState } from "react";

// HourlyCard Component
const HourlyCard = ({ hourData }) => {
  const { temp, time, icon } = hourData; // Destructure the necessary data from the API response

  return (
    <Card
      className="hourly-card"
      style={{
        width: 100,
        backgroundColor: "#222831", // Adapt to dark mode colors
        color: "#EEEEEE",
        borderRadius: "8px",
        border: "1px solid #00ADB5", // Slight border to match your theme
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{time}</p>{" "}
      {/* Display Time */}
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} // Weather icon
        alt="weather icon"
        style={{ width: "40px", height: "40px" }}
      />
      <p style={{ fontSize: "1.1rem", color: "#00ADB5" }}>{temp}°C</p>{" "}
      {/* Display Temperature */}
    </Card>
  );
};

// Main Weather Component
const WeatherHourly = ({ hourlyWeatherData }) => {
  return (
    <div className="flex justify-start items-center gap-3 overflow-scroll">
      {hourlyWeatherData.map((hour, index)=>{
        return(
      <Col key={index}>
        <HourlyCard
          hourData={{
            time: new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            }),
            temp: hour.temp.toFixed(0),
            icon: hour.weather[0].icon,
          }}
        />
      </Col>
        )
      })
      }
    </div>
  );
};

export default WeatherHourly;
