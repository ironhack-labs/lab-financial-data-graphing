const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", (req, res) => res.render("index", { title: "Express" }));

// router.get("/", (req, res) => {
//   axios
//     .get("http://api.coindesk.com/v1/bpi/historical/close.json")
//     .then((response) => {
//       console.log(response);
//       res.render("index", { data: JSON.stringify(response.data.bpi) });
//     })
//     .catch((err) => {
//       console.log("Err", err);
//     });
// });

module.exports = router;
