const coinDeskApi = axios.create({
  baseURL: ' https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2018-09-05'
});
//Canvas config
var ctx = document.getElementById('myChart').getContext('2d');

//API response function
function getBTCInfo() {
  coinDeskApi.get()
  .then(responseFromAPI => {
      console.log('Response from API is: ', responseFromAPI.data.bpi);     
      printBTCChart(responseFromAPI.data.bpi);      
})
.catch(err => {
  console.log('Error is: ', err);
  })
}
getBTCInfo();

//Draw into chart API response
const printBTCChart = (cryptoData => {
  const cryptoLabels = Object.keys(cryptoData)
  const cryptoPrice = Object.values(cryptoData)
  const chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: cryptoLabels,
        datasets: [{
            label: "BitCoin price chart",
            backgroundColor: 'rgba(95, 80, 226, 0.212)',
            borderColor: 'rgba(95, 80, 226, 0.9)',
            data: cryptoPrice,
        }]
    },

    // Configuration options go here
    options: {}
  });
});
