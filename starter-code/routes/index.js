const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Gráficas de bitcoin"});
});

router.get('/datos', (req, res, next)=>{
  let bitcoindata = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
   });
  bitcoindata.get()
  .then((response)=>{
    res.json(response.data.bpi);
  })
  .catch((err)=>{
    console.log(err);
  })
});

router.get('/datos/:fechaunica', (req, res, next)=>{
  let bitcoindata = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
   });
  bitcoindata.get()
  .then((response)=>{
    res.json(response.data.bpi[req.params.fechaunica]);
  })
  .catch((err)=>{
    console.log(err);
  })
});

router.get('/rango', (req, res, next)=>{
  let bitcoindata = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + req.query.inicio + "&end=" + req.query.fin
   });
  bitcoindata.get()
  .then((response)=>{
    res.json(response.data.bpi);
  })
  .catch((err)=>{
    console.log(err);
  })
});

router.post('/filtro', (req, res, next)=>{
  let bitcoindata = axios.create({
    baseURL: "/rango?inicio=" + req.body.inputInicio + "&fin=" + req.body.inputFin
   });
  bitcoindata.get()
  .then((response)=>{
    res.json(response.data.bpi);
  })
  .catch((err)=>{
    console.log(err);
  })
});
module.exports = router;
