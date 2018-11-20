
window.onload = function () {

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((bitCoinData) => {
      console.log(bitCoinData);

    })


}

