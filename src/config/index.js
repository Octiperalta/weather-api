const dotenv = require("dotenv");
const envFound = dotenv.config(); // Variable para controlar que el .env haya sido encontrado

if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Exporto todos los datos sobre la configuracion del servidor
module.exports = {
  port: process.env.PORT,
  api: {
    prefix: "/api/v1",
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: "/api-documentation",
  },
  mapbox: {
    apiKey: process.env.MAPBOX_API_KEY,
    pathBase: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  },
  openWeather: {
    apiKey: process.env.OPEN_WEATHER_API_KEY,
    pathBase: "https://api.openweathermap.org/data/2.5/weather",
  },
};
