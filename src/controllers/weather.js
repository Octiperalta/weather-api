const express = require("express");
const { findWeather, findCityById } = require("../services/weatherService");
const Success = require("../handlers/successHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const weatherByCoordinates = async (req, res, next) => {
  try {
    const { lon, lat } = req.query;
    const weather = await findWeather(lon, lat);
    res.json(new Success(weather));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const weatherByCityId = async (req, res, next) => {
  try {
    const { city, cityId } = req.params;
    const weather = await findCityById(city, cityId);
    res.json(new Success(weather));
  } catch (error) {
    next(error);
  }
};

module.exports = { weatherByCoordinates, weatherByCityId };
