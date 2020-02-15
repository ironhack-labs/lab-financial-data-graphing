const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Bitcoin Price Index" });
});

router.get("");

module.exports = router;
