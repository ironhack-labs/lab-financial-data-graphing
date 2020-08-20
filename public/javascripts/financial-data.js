const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    console.log(responseFromAPI); // Iteration 1
    printTheChart(responseFromAPI.data); 
  })
  .catch(err => console.log('Error while getting the data: ', err));


function printTheChart(stockData) {
  const dailyData = stockData.bpi;

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
            backgroundColor: 'rgb(3, 223, 252)',
            borderColor: 'rgb(3, 223, 252)',
            data: bitcoinPrices
        }]
    },

    
  });
}

document.querySelector("#go-btn").onclick = () => {
  const endDate = document.querySelector("#end-date").value;
  const startDate = document.querySelector("#start-date").value;
  const currency = document.querySelector("#currency-selector").value;
  if (endDate && startDate) {
    axios
      .get(
        apiUrl +
          "?start=" +
          startDate +
          "&end=" +
          endDate +
          `&currency=${currency}`
      )
      .then((responseFromAPI) => {
        printTheChart(responseFromAPI.data);
      })
      .catch((err) => {
        console.log("Error while getting the data: ", err);
      });
  } else {
    axios
      .get(apiUrl + `?currency=${currency}`)
      .then((responseFromAPI) => {
        printTheChart(responseFromAPI.data);
      })
      .catch((err) => {
        console.log("Error while getting the data: ", err);
      });
  }
};