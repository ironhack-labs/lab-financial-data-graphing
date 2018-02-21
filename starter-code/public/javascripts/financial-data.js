const axios = require('axios');

const bitcoinApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getBitcoinInfo(id) {
  axios.get(id)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.error(err)
  })
}

getBitcoinInfo('2018-01-21');