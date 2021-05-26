const axios = require("axios");
const { mapbox } = require("../config");

class CityRepository {
  constructor() {
    this.limit = 10;
    this.lang = "es";
    this.pathBase = mapbox.pathBase;
    this.apiKey = mapbox.apiKey;
  }

  async findCities(city) {
    try {
      //? Creamos una instancia de axios de la url para tener una mejor organizacion y declaratividad
      const instance = axios.create({
        baseURL: `${this.pathBase}${city}.json`,
        params: {
          access_token: this.apiKey,
          limit: this.limit,
          languange: this.languange,
        },
      });

      const response = await instance.get();

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CityRepository;
