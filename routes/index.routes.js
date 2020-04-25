const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => res.render("index", { title: "Express" }));

module.exports = router;

/*
1. $ npm install
2. require
3. exports
*/
