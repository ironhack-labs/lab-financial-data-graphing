const key = 'demo';
const functionName = 'TIME_SERIES_DAILY';
const symbolName = 'MSFT';
button = document.querySelector('button');

button.addEventListener('click', () => {
  const fromDate = document.getElementById('from-date').value
  const toDate = document.getElementById('to-date').value
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
  //https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05
  
  axios
    .get(apiUrl)
    .then(responseFromApi => {
      //console.log(responseFromApi)
          printTheChart(responseFromApi.data);
    })
    .catch(err => console.log('Error while getting the data: ', err));
})    


function printTheChart(indexData) {
  const dailyData = indexData.bpi;
  console.log(dailyData)
 
  const bitcoinDates = Object.keys(dailyData);
  //console.log(bitcoinDates) --> prints dates
  const bitcoinIndex = bitcoinDates.map(index => dailyData[index]);
  //console.log(bitcoinIndex)
 
  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitcoinDates,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: bitcoinIndex
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()