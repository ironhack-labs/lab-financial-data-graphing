let express = require("express");
let router = express.Router();
let axios = require("axios");
let endpoint = "https://api.coindesk.com/v1/bpi/historical/close.json";

router.post("/", (req, res, next) => {
  let { fromDate, toDate, toCurrency } = req.body;
  let search = `${endpoint}/?start=${fromDate}&end=${toDate}&currency=${toCurrency}`;
  axios.get(search)
    .then(results => {
      let labels = Object.keys(results.data.bpi);
      let data = Object.values(results.data.bpi);
      let minValue = Math.min.apply(null, data);
      let maxValue = Math.max.apply(null, data);
      res.render("index", { labels, data, minValue, maxValue });
    })
    .catch(e => next(e));
});

router.get("/", function(req, res, next) {
  axios
    .get(endpoint)
    .then(results => {
      const labels = Object.keys(results.data.bpi);
      const data = Object.values(results.data.bpi);
      res.render("index", { labels, data });
      console.log(labels);
    })
    .catch(e => next(e));
});

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
