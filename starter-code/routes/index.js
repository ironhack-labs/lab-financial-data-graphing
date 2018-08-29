const express = require("express");
const router = express.Router();
const chart = require("chart.js");
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
