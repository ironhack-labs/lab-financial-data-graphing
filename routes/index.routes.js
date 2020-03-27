const express = require('express');
const router = express.Router();

// Date Padding Function
const pad = number => (number < 10 ? "0" + number : number);

// Format default dates for input fields
const today = new Date();
const currentDate = today.getFullYear() + "-" + pad((today.getMonth() + 1)) + "-" + pad(today.getDate());
const pastDate = today.getFullYear() + "-" + pad((today.getMonth())) + "-" + pad(today.getDate());


// const currentDateFormat = today.toLocaleDateString("en-GB", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit"
// });

/* GET home page. */
router.get("/", (req, res) =>
  res.render("index", {
    title: "CoinDesk Bitcoin History Closing Chart",
    startingDate: pastDate,
    endingDate: currentDate
  })
);

module.exports = router;
