const coinInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/',
});


// stockInfo.get(`${stockTicket1}/chart`)
//   .then(response => {
//     printTheChart(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

coinInfo.get('close.json')
  .then((response) => {

    let coinData = response.data.bpi
    // console.log(Object.keys(coinData.bpi))

    printTheChart(coinData)
  })
  .catch(error => {
    console.log(error);
  });




document.getElementById('search').onclick = function () {
  let startDate = document.getElementById('start-date').value
  let endDate = document.getElementById('end-date').value
  let currency = document.getElementById('currency').value

  coinInfo.get(`close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then((response) => {

      let coinData = response.data.bpi
      // console.log(Object.keys(coinData.bpi))

      printTheChart(coinData)
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById('currency').onchange = function () {
  let startDate = document.getElementById('start-date').value
  let endDate = document.getElementById('end-date').value
  let currency = document.getElementById('currency').value


  coinInfo.get(`close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
    .then((response) => {

      let coinData = response.data.bpi
      // console.log(Object.keys(coinData.bpi))

      printTheChart(coinData)

    })
    .catch(error => {
      console.log(error);
    });




}




function printTheChart(coinData) {
  let date = []
  let coinPrice = []
  for (const properties1 in coinData) {
    date.push(properties1)
  }
  for (const properties1 in coinData) {
    coinPrice.push(coinData[properties1])
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice,
      }]
    }
  });

  let maxValue = Math.max(...coinPrice)
  let minValue = Math.min(...coinPrice)

  document.getElementById('max-value').value = maxValue
  document.getElementById("min-value").value = minValue
};

function printTheChartWithMax(coinData) {
  let date = []
  let coinPrice = []
  for (const properties1 in coinData) {
    date.push(properties1)
  }



  for (const properties1 in coinData) {
    coinPrice.push(coinData[properties1])
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: coinPrice,
      }]
    }
  });


};