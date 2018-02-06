'use strict';
function main () {
  const coinApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getCoinInfo (bpi) {
    coinApi.get(bpi)
      .then(response => {
        const data1 = [];
        const data2 = [];

        for (const property in response.data.bpi) {
          if (!response.data.bpi.hasOwnProperty(property)) {
            continue;
          }

          data1.push(property);
          data2.push(response.data.bpi[property]);
        }

        console.log(data1);
        console.log(data2);
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
