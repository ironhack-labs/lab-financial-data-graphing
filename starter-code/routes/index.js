var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/api/data", function(req, res, next) {
  res.render("api-data");
});

module.exports = router;
