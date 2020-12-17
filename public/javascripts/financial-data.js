
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
//const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;
 
axios
  .get(apiUrl)
  .then(responseFromAPI => console.log('The response from API: ', responseFromAPI))
  .catch(err => console.log('Error while getting the data: ', err));

  axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));
 
function printTheChart(bitcoinData) {
  const dailyData = bitcoin['Time Series (Daily)'];
  const stockDates = Object.keys(dailyData);
  
 
  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: data, 
 });
}
