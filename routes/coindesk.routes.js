const axios = require("axios");
const express = require("express");
const coindeskRoute = express.Router();

coindeskRoute.get("/", (req, res, next) => {
  const { startDate, endDate, currency } = req.query;
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(results => {
      res.json(results.data.bpi);
    })
    .catch(err => next(err));
});

module.exports = coindeskRoute;
