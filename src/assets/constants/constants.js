//? Import statement for all weather info and condition icons at once as a whole
import * as icons from "../icons/icons"; // Assuming all icons are exported from an index.js file in the same folder

export const additionalInfoIcons = [
  {
    icon: icons.humidityIcon,
    label: "Humidity",
  },
  {
    icon: icons.pressureIcon,
    label: "Pressure",
  },
  {
    icon: icons.feelsLikeIcon,
    label: "Feels Like",
  },
  {
    icon: icons.sunriseIcon,
    label: "Sunrise",
  },
  {
    icon: icons.sunsetIcon,
    label: "Sunset",
  },
  {
    icon: icons.windIcon,
    label: "Wind",
  },
];

export const weatherIcons = [
  // Thunderstorm Icons
  { icon: 200, path: icons.thunderLightRain }, // Thunderstorm with light rain
  { icon: 201, path: icons.thunderRain }, // Thunderstorm with rain
  { icon: 202, path: icons.thunderHeavyRain }, // Thunderstorm with heavy rain
  { icon: 210, path: icons.thunderLight }, // Light thunderstorm
  { icon: 211, path: icons.thunder }, // Thunderstorm
  { icon: 212, path: icons.thunderHeavy }, // Heavy thunderstorm
  { icon: 221, path: icons.thunderRagged }, // Ragged thunderstorm
  { icon: 230, path: icons.thunderLightRain }, // Thunderstorm with light drizzle
  { icon: 231, path: icons.thunderDrizzle }, // Thunderstorm with drizzle
  { icon: 232, path: icons.thunderDrizzle }, // Thunderstorm with heavy drizzle (same as thunderDrizzle)

  // Drizzle Icons
  { icon: 300, path: icons.drizzle }, // Light intensity drizzle
  { icon: 301, path: icons.drizzle }, // Drizzle
  { icon: 302, path: icons.heavyDrizzle }, // Heavy intensity drizzle
  { icon: 310, path: icons.lightDrizzle }, // Light intensity drizzle rain
  { icon: 311, path: icons.drizzleRain }, // Drizzle rain
  { icon: 312, path: icons.heavyDrizzleRain }, // Heavy intensity drizzle rain
  { icon: 313, path: icons.showerRainDrizzle }, // Shower rain and drizzle
  { icon: 314, path: icons.heavyDrizzleRain }, // Heavy shower rain and drizzle (same as heavyDrizzleRain)
  { icon: 321, path: icons.showerDrizzle }, // Shower drizzle

  // Rain Icons
  { icon: 500, path: icons.lightRainD }, // Light rain
  { icon: 501, path: icons.moderateRainD }, // Moderate rain
  { icon: 502, path: icons.heavyRainD }, // Heavy intensity rain
  { icon: 503, path: icons.veryHeavyRainD }, // Very heavy rain
  { icon: 504, path: icons.extremeRainD }, // Extreme rain
  { icon: 511, path: icons.snow }, // Freezing rain
  { icon: 520, path: icons.thunderLightRain }, // Light intensity shower rain
  { icon: 521, path: icons.thunderRain }, // Shower rain
  { icon: 522, path: icons.thunderHeavyRain }, // Heavy intensity shower rain
  { icon: 531, path: icons.thunderHeavyRain }, // Ragged shower rain (same as heavy rain)

  // Snow Icons
  { icon: 600, path: icons.lightSnow }, // Light snow
  { icon: 601, path: icons.snow }, // Snow
  { icon: 602, path: icons.heavySnowD }, // Heavy snow
  { icon: 611, path: icons.drizzle }, // Sleet (same as drizzle)
  { icon: 612, path: icons.showerSnowD }, // Shower snow  
  { icon: 615, path: icons.lightSnow }, // Light rain and snow
  { icon: 616, path: icons.showerSnowD }, // Rain and snow
  { icon: 620, path: icons.lightSnow }, // Light snow showers
  { icon: 621, path: icons.snow }, // Snow showers
  { icon: 622, path: icons.heavySnowD }, // Heavy snow showers

  // Atmosphere Icons
  { icon: 701, path: icons.drizzle }, // Mist (same as drizzle)
  { icon: 711, path: icons.smoke }, // Smoke
  { icon: 721, path: icons.haze }, // Haze
  { icon: 731, path: icons.sandDust }, // Sand, dust
  { icon: 741, path: icons.fog }, // Fog
  { icon: 751, path: icons.sandDust }, // Sandstorm
  { icon: 761, path: icons.sandDust }, // Duststorm
  { icon: 762, path: icons.sandDust }, // Volcanic ash
  { icon: 771, path: icons.tornado }, // Squalls
  { icon: 781, path: icons.tornado }, // Tornado

  // Clear Sky
  { icon: 800, path: icons.sun }, // Clear sky

  // Cloud Icons
  { icon: 801, path: icons.cloudD }, // Few clouds (11-25%)
  { icon: 802, path: icons.scatteredClouds }, // Scattered clouds (25-50%)
  { icon: 803, path: icons.brokenClouds }, // Broken clouds (51-84%)
  { icon: 804, path: icons.overcastClouds }, // Overcast clouds (85-100%)

  // Extreme Icons
  { icon: 900, path: icons.tornado }, // Tornado
  { icon: 901, path: icons.tornado }, // Tropical storm
  { icon: 902, path: icons.tornado }, // Hurricane
  { icon: 903, path: icons.heavySnowD }, // Cold
  { icon: 904, path: icons.sandDust }, // Hot
  { icon: 905, path: icons.windy }, // Windy
  { icon: 906, path: icons.snow }, // Hail

  // Additional Icons
  { icon: 951, path: icons.cloudD }, // Calm
  { icon: 952, path: icons.windy }, // Light breeze
  { icon: 953, path: icons.windy }, // Gentle breeze
  { icon: 954, path: icons.lightDrizzle }, // Moderate breeze
  { icon: 955, path: icons.windy }, // Fresh breeze
  { icon: 956, path: icons.windy }, // Strong breeze
  { icon: 957, path: icons.gale }, // High wind, near gale
  { icon: 958, path: icons.gale }, // Gale
  { icon: 959, path: icons.gale }, // Severe gale
  { icon: 960, path: icons.tornado }, // Storm
  { icon: 961, path: icons.tornado }, // Violent storm
  { icon: 962, path: icons.tornado }, // Hurricane
];

