const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Financial Data" });
});

router.get("");

module.exports = router;
