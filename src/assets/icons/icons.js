//? Import statements for menu icons
import menuIcon from "./menu.png"
import citiesIcon from "./globe.png"
import settingsIcon from "./settings.png"
import mapIcon from "./map.png"
import profileIcon from "./profile.png"

//? Import statements for additional weather info icons
import humidityIcon from "./humidity.png";
import pressureIcon from "./pressure.png";
import feelsLikeIcon from "./feelsLike.png";
import sunriseIcon from "./sunrise.png";
import sunsetIcon from "./sunset.png";
import windIcon from "./wind.png";

//? Import statements for weather conditions icons

//* Thunder Icons
import thunderLightRain from "./thunderLightRain.png";
import thunderRain from "./thunderRain.png";
import thunderHeavyRain from "./thunderHeavyRain.png";
import thunderLight from "./thunderLight.png";
import thunder from "./thunder.png";
import thunderHeavy from "./thunderHeavy.png";
import thunderRagged from "./thunderRagged.png";
import thunderDrizzle from "./thunderDrizzle.png";
// Removed: thunderDrizzleHeavy (same as thunderDrizzle)

//* Drizzle Icons
import drizzle from "./drizzle.png";
import heavyDrizzle from "./heavyDrizzle.png";
import lightDrizzle from "./lightDrizzle.png";
import drizzleRain from "./drizzleRain.png";
import heavyDrizzleRain from "./heavyDrizzleRain.png";
import showerRainDrizzle from "./showerRainDrizzle.png";
import showerDrizzle from "./showerDrizzle.png";
// Removed: heavyShowerRainDrizzle (same as heavyDrizzleRain)

//* Rain Icons
import lightRainD from "./lightRainD.png";
import moderateRainD from "./moderateRainD.png";
import heavyRainD from "./heavyRainD.png";
import veryHeavyRainD from "./veryHeavyRainD.png";
import extremeRainD from "./extremeRainD.png";
import snow from "./snow.png"; // Same as freezing rain

//* Snow Icons
import lightSnow from "./lightSnow.png";
import heavySnowD from "./heavySnowD.png";
import showerSnowD from "./showerSnowD.png";
// Removed: lightSnowShowers (same as lightSnow)
// Removed: snowShowers (same as snow)
// Removed: heavySnowShowers (same as heavySnowD)

//* Atmosphere Icons
import smoke from "./smoke.png";
import haze from "./haze.png";
import sandDust from "./sandDust.png"; // Same as sand, dust
import fog from "./fog.png";
// Removed: sandstorm (same as sandDust)
// Removed: duststorm (same as sandDust)
// Removed: volcanicAsh (same as sandDust)
import tornado from "./tornado.png"; // Same as squalls

//* Clear Icons
import sun from "./sun.png"; // Clear sky
import moon from "./moon.png"; // Clear sky (Night)
//* Determine whether it's day or night
const isDayTime = () => {
  const currentHour = new Date().getHours();
  //* Assuming day time is from 6 AM to 6 PM
  return currentHour >= 6 && currentHour < 18;
};
//* Set clear icon based on day or night
const clearIcon = isDayTime() ? sun : moon;

//* Cloud Icons
import cloudD from "./cloudD.png"; // Few clouds (11-25%)
import scatteredClouds from "./scatteredClouds.png"; // Scattered clouds (25-50%)
import brokenClouds from "./brokenClouds.png"; // Broken clouds (51-84%)
import overcastClouds from "./overcastClouds.png"; // Overcast clouds (85-100%)

//* Extreme Icons
// import heavySnowD from "./heavySnowD.png"; // Cold
import windy from "./windy.png"; // Windy

//* Additional Icons
import gale from "./gale.png"; // High wind, near gale

//? Export statement for all icons
export {
    //* Menu icons
    menuIcon,
    citiesIcon,
    settingsIcon,
    mapIcon,
    profileIcon,

    //* Additional weather info icons
    humidityIcon,
    pressureIcon,
    feelsLikeIcon,
    sunriseIcon,
    sunsetIcon,
    windIcon,

    //* Thunder Icons
    thunderLightRain,   
    thunderRain,
    thunderHeavyRain,
    thunderLight,
    thunder,
    thunderHeavy,
    thunderRagged,
    thunderDrizzle,

    //* Drizzle Icons
    drizzle,
    heavyDrizzle,
    lightDrizzle,
    drizzleRain,
    heavyDrizzleRain,
    showerRainDrizzle,
    showerDrizzle,

    //* Rain Icons
    lightRainD,
    moderateRainD,
    heavyRainD,
    veryHeavyRainD,
    extremeRainD,
    snow,

    //* Snow Icons
    lightSnow,
    heavySnowD, 
    showerSnowD,

    //* Atmosphere Icons
    smoke,
    haze,
    sandDust,
    fog,
    tornado,

  //* Clear Icons
    clearIcon,

    //* Cloud Icons
    cloudD,
    scatteredClouds,
    brokenClouds,
    overcastClouds,

    //* Extreme Icons
    // heavySnowD,
    windy,

    //* Additional Icons
    gale,
};

// https://www.freepik.com/icon/down_13533656#fromView=search&page=1&position=91&uuid=312cf6b2-44a7-4268-a989-089b9ab02e36  
