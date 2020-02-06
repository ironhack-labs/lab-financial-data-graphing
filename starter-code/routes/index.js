var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/", (req, res) => {
  res.render("/starter-code/financial-data/index.js", {
    data: "responseFromAPI.data"
  });
});

module.exports = router;
