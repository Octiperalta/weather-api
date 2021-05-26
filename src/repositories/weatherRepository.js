const axios = require("axios");
const { openWeather } = require("../config");

class WeatherRepository {
  constructor() {
    this.units = "metric";
    this.lang = "es";
    this.pathBase = openWeather.pathBase;
    this.appid = openWeather.apiKey;
  }

  async getWeather(lon, lat) {
    try {
      //? Creamos una instancia de axios de la url para tener una mejor organizacion y declaratividad
      const instance = axios.create({
        baseURL: `${this.pathBase}`,
        params: {
          lat,
          lon,
          appid: this.appid,
          units: this.units,
          lang: this.lang,
        },
      });

      const response = await instance.get();

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = WeatherRepository;
