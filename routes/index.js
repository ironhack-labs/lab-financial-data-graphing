const router = require("express").Router();
const dataRequest = require('../public/js/financial-data.js');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/bitcoin-price', (req, res, next) => {
  res.render('bitcoinGraph');
})

module.exports = router;