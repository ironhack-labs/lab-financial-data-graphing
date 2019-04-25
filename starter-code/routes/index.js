var express = require("express");
var Chart = require("chart.js");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "IronCryptocurrency" });
});

module.exports = router;
