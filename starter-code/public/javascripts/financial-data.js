'use strict';
function main () {
  const coinApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getCoinInfo (bpi) {
    coinApi.get(bpi)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  document.getElementById('coinButton').onclick = function () {
    getCoinInfo('');
  };
}

window.onload = main;
