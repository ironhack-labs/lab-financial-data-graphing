function getInfo() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
        .then(response => printChart(response.data))
        //.then(r => console.log(r))
        .catch(error => console.error(error));
}


const ctx = document.getElementById('myChart').getContext('2d');

function printChart(bpiData) {
  const dailyData = bpiData['bpi'];
  console.log('Daily Data: ' + dailyData)
 
  const bpiDates = Object.keys(dailyData);
  const ratePrices = bpiDates.map(date => dailyData[date]);
 
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bpiDates,
      datasets: [
        {
          label: 'Bitcoin Rate',
          backgroundColor: 'transparent',
          borderColor: 'rgb(255, 99, 132)',
          data: ratePrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()