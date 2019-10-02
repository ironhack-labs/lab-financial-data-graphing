const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/",
});

function getCoins() {
  coinDeskApi
    .get('close.json')
    .then(responseFromAPI => {
      let labels = Object.keys(responseFromAPI.data.bpi);
      let data = Object.values(responseFromAPI.data.bpi);
      drawGraph(labels, data);
    })
    .catch(err => console.log("Error is: ", err));
}

getCoins();

// function 
function drawGraph(labels, data) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'bpi',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function filterByDate() {
  let date1 = document.querySelectorAll('input')[0].value;
  let date2 = document.querySelectorAll('input')[1].value;
  let query = '';
  console.log(date1, date2);

  if (date1 && date2) {
    query = `?start=${date1}&end=${date2}`;
  }

  coinDeskApi
    .get('close.json' + query)
    .then(responseFromAPI => {
      let labels = Object.keys(responseFromAPI.data.bpi);
      let data = Object.values(responseFromAPI.data.bpi);
      drawGraph(labels, data);
    })
    .catch(err => console.log("Error is: ", err.status));


}