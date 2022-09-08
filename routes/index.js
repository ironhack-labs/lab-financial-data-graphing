const router = require("express").Router();
const axios = require('axios')
// const AxiosCoindesk = require('../services/Coindesk.service')
// const axiosCoindeskAPI = new AxiosCoindesk();







/* GET home page */
router.get("/", (req, res, next) => {


  res.render("index");
});

module.exports = router;
