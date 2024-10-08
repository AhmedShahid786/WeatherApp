import humidityGif from "../icons/humidity.png";
import pressureGif from "./pressure.gif";
import feelsLikeGif from "./feelsLike.gif";
import sunriseGif from "./sunrise.gif";
import moonriseGif from "./moonrise.gif";
import wind from "./wind.gif";
import FormItemLabel from "antd/es/form/FormItemLabel";

const gifs = [
  {
    gif: humidityGif,
    label: "Humidity",
  },
  {
    gif: pressureGif,
    label: "Pressure",
  },
  {
    gif: feelsLikeGif,
    label: "Feels Like",
  },
  {
    gif: sunriseGif,
    label: "Sunrise",
  },
  {
    gif: moonriseGif,
    label: "Moonrise",
  },
  {
    gif: wind,
    label: "Wind",
  },
];

export default gifs;
