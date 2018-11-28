const BTC_hist_price_data  = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json',
});

BTC_hist_price_data.get()
    .then(result => {
      //Object.keys(result.data.bpi)
      //Object.values(result.data.bpi)
      //console.log(result.data.bpi)
      receiveBtcData(result.data.bpi);
    })
    .catch( error => {
      console.log(error);
  });


function receiveBtcData (btc_historical_prices){
  const btc_dates = Object.keys(btc_historical_prices)
  const btc_price = Object.values(btc_historical_prices)

  const ctx = document.getElementById('btc_chart').getContext('2d')
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: btc_dates,
      datasets:[{
        data: btc_price,
        label:'BTC Historical price',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)'
      }]
    }
  })
}