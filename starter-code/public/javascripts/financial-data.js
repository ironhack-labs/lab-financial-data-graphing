const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function prepareData(bpi) {
  return _.toPairs(new bpi);
}

function buildChart(dataOne) {
  var ctx = document.getElementById("myChart").getContext('2d');
  var config = {
    type: 'line',
    color: 'blue',
    data: {
      labels: Object.keys(dataOne),
      datasets: Object.values(dataOne)
    }
  }
  var myChart = new Chart(ctx, config); 
}

function getcoinDeskInfo() {
  coinDeskApi.get()
  .then(response => {
    const chartData = response.data.bpi;

    buildChart(chartData);
  })
  .catch(err => {
    console.error(err)
  })
}

document.getElementById("coin-button").onclick = function(){
  getcoinDeskInfo();
}