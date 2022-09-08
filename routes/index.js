const router = require("express").Router();
const Chart = require('chart.js')
const axios = require('axios')



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
