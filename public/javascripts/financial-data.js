const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log(responseFromAPI); // Iteration 1
    printTheChart(responseFromAPI.data); 
  })
  .catch(err => console.log('Error while getting the data: ', err));

// Iteration 2
function printTheChart(bitcoinData) {
  const dailyData = bitcoinData.bpi;

  const dates = Object.keys(dailyData);
  const bitcoinPrices = dates.map(date => dailyData[date]);

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates,
        datasets: [{
            label: 'Bitcoin Price index',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: bitcoinPrices
        }]
    },

    // // Configuration options go here
    // options: {}
  });
}

// Iteration 3
document.querySelector('.btn-submit').onclick = () => {
  const startDate = document.querySelector('#startDate').value;
  const endDate = document.querySelector('#endDate').value;
  // console.log('button clicked');

  if (startDate && endDate) {
    axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
      .then(responseFromAPI => {
        printTheChart(responseFromAPI.data); 
      })
      .catch(err => console.err('Please select a starting and ending date.'));
  }
}