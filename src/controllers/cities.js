const express = require("express");
const { findCities } = require("../services/cityService");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const cities = async (req, res, next) => {
  //? Creamos una sentencia try-catch para que el error pueda ser manejado por el errorHandler creado anteriormente
  try {
    const { city } = req.params;
    const cities = new Success(await findCities(city));
    res.json(cities);
  } catch (err) {
    next(err);
  }
};

module.exports = { cities };
