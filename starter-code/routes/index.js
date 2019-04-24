const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('chartView');
});

// This will only expose the user to the desired data
router.get('/api', (req, res, next) => {
  const q = req.query;
  const baseURL = 'https://api.coindesk.com/v1/bpi/historical/close.json';
  const query = Object.keys(q)
    .map(key => `${key}=${q[key]}`)
    .join('&');
  const endpoint = `${baseURL}?${query}`;

  axios
    .get(endpoint)
    .then(response => {
      const data = response.data.bpi;
      res.send(data);
    })
    .catch(err => res.send(err));
});

module.exports = router;
