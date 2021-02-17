//https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05

// ?start=<VALUE>&end=<VALUE> Allows data to be returned for a specific date range. Must be listed as a pair of start and end parameters, with dates supplied in the YYYY-MM-DD format,



 // const startDate = document.getElementById('start').value
  // const endDate = document.getElementById('end').value
  // const urlR = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`


 
const url = `https://api.coindesk.com/v1/bpi/historical/close.json`
  axios
  .get(url)
  .then(responseFromApi => {
    console.log('The response from API: ', responseFromApi)
    printTheChart(responseFromApi.data)
  })
  .catch(err => console.log('Error while getting the data: ', err));

  




function printTheChart(bitData) {
  const dailyData = bitData['bpi'];
 
  const bitDates = Object.keys(dailyData);
  const bitPrices = bitDates.map(date => dailyData[date]);
 
  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitDates,
      datasets: [
        {
          label: 'BIT Chart',
      
          borderColor: 'rgb(11, 99, 132)',
          data: bitPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()