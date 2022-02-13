const router = require("express").Router();
const axios = require("axios");
const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/getData", async (req, res, next)=> {
  try {
    console.log("req.query: ", req.query);
    const { start, end, currency } = req.query;
    // console.log("Coindesk endpoint: ", `${baseURL}?start=${start}&end=${end}&currency=${currency}`);
    const response = await axios.get(`${baseURL}?start=${start}&end=${end}&currency=${currency}`);
    console.log("response.data.bpi from coindesk: ", response.data.bpi);
    res.json(response.data.bpi);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
