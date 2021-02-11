const express = require('express');
const router = express.Router();
//const axios = require('axios').default;
//const dataUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

/* GET home page. */
/*
router.get('/', (req, res) => {
    axios
    .get(dataUrl)
    .then(reponseFromApi => console.log(reponseFromApi))
    .catch(error => console.log('Error getting API data'))
    .finally(res.render('index', { title: 'Express' }))
});
*/
router.get('/', (req, res) => {
    res.render('index', { title: 'LAB | Financial Data Graphing' })
});

module.exports = router;
