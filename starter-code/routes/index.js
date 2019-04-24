var express = require('express');
var router = express.Router();
var axios = require('axios')
var Chart = require('chart.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json') //  https://api.coindesk.com/v1/bpi/historical/close.json
                                                                 //  https://api.coindesk.com/v1/bpi/currentprice.json
    .then(response => {
      const info = response.data.bpi 
      console.log(info)
      res.render('index', info);
    })
});

module.exports = router;



/* axios.get('https://rickandmortyapi.com/api/character/')
  .then(response => response.data.results
        .map(({name, image})=> {
      var domName = document.createElement('p')
      domName.innerHTML = name
      var domImage = document.createElement('img')
      domImage.src = image
      var body = document.querySelector('body')
      body.appendChild(domName)
      body.appendChild(domImage)
})) */
