//? UI components imports
import { Card, Col } from "antd";
import { weatherIcons } from "../assets/constants/constants";

const HourlyCard = ({ hourData }) => {
  const { temp, time, icon } = hourData;

  return (
    <Card
      className="hourly-card my-4"
      style={{
        width: 100,
        backgroundColor: "#222831", 
        color: "#EEEEEE",
        borderRadius: "8px",
        border: "2px solid #00ADB5",
        textAlign: "center",
      }}
    >
      <p className="text-base font-customFont" >{time}</p>
      <img
        src={icon} // Weather icon
        alt="weather icon"
        style={{ width: "40px", height: "40px" }}
      />
      <p className="text-xl font-customFont text-fourthD">{temp}°C</p>
    </Card>
  );
};

const WeatherHourly = ({ hourlyWeatherData }) => {
  const findIcon = (iconId) => {
    const iconObject = weatherIcons.find((icon) => icon.icon === iconId);
    return iconObject.path;
  };
  return (
    <div className="flex justify-start items-center gap-3 overflow-scroll">
      {hourlyWeatherData.map((hour, index)=>{
        return (
          <Col key={index}>
            <HourlyCard
              hourData={{
                time: new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                }),
                temp: Math.round(hour.temp - 273.15),
                icon: findIcon(hour.weather[0].id),
              }}
            />
          </Col>
        );
      })
      }
    </div>
  );
};

export default WeatherHourly;
