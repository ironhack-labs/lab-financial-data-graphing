var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/api/data", function(req, res, next) {
  res.render("api-data");
});

module.exports = router;
