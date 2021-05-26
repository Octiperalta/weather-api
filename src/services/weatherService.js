const WeatherRepository = require("../repositories/weatherRepository");
const cityRepository = require("../repositories/cityRepository");
const wRepository = new WeatherRepository();
const cRepository = new cityRepository();
const logger = require("../loaders/logger");

const findWeather = async (lon, lat) => {
  const weather = await wRepository.getWeather(lon, lat);

  return {
    name: weather.name,
    description: weather.weather[0].description,
    temperature: weather.main.temp,
    temperatureMin: weather.main.temp_min,
    temperatureMax: weather.main.temp_max,
  };
};

const findCityById = async (city, id) => {
  const cities = await cRepository.findCities(city);
  const cityData = cities.features.find(c => c.id === id);
  const [lon, lat] = cityData.geometry.coordinates;

  return await findWeather(lon, lat);
};

module.exports = { findWeather, findCityById };
