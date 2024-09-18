import React from 'react'

const WeatherHourly = () => {
  return (
    <div>
      <div className="testBorder w-36 h-40 flex flex-col justify-center items-center mt-2 mr-2 text-sub">
        <p>6:00</p>
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.img}@2x.png`}
          alt=""
          className="w-20 h-20"
        />
        <p className="text-4xl">21</p>
      </div>
    </div>
  );
}

export default WeatherHourly