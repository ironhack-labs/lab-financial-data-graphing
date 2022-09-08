const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/graph", (req, res, next) => {
  res.render("graph");
});

module.exports = router;
