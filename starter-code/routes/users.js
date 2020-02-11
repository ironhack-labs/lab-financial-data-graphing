var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/graph", function(req, res, next) {
  res.send("response with a source");
});

module.exports = router;
