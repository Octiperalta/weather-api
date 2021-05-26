//* CREAMOS ESTE SERVICIO PARA QUE GUARDE LA LOGICA DE FILTRAR LA INFORMACION PARA DEVOLVER AL USUARIO

//? Delegamos la logica y el trabajo de buscar las ciudades a un repositorio (clase) que posee funciones utiles
const logger = require("../loaders/logger");
const CityRepository = require("../repositories/cityRepository");
const repository = new CityRepository();

const findCities = async city => {
  const cities = await repository.findCities(city);
  return cities.features.map(c => {
    return {
      id: c.id,
      name: c.place_name,
      lon: c.geometry.coordinates[0],
      lat: c.geometry.coordinates[1],
    };
  });
};

module.exports = { findCities };
