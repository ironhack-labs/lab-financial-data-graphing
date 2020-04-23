const express = require('express');
const router = express.Router();
const axios = require('axios')


/* GET home page. */
router.get('/', async(req, res, next ) => {
  const {data} = await axios.get('https://api.kanye.rest')
  res.render('index', data)
})    
module.exports = router;
