const currentPrice = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi/historical/close.json"
});



function bitcoinsInfo() {
  currentPrice.get()
  
  
  .then(response => {
    console.log(response)
    const keysArray = Object.keys(response.data.bpi)
    const valuesArray = Object.values(response.data.bpi)
    console.log(valuesArray)
  

    printTheChart(keysArray, valuesArray);
  })
  .catch(err => console.log("hubo un error", err))
}

function printTheChart(keyInfo, valueInfo) {
  const bitLabels = keyInfo
  const bitPrice = valueInfo
  const ctx = document.getElementById("bitcoins").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: bitLabels,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(100, 255, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: bitPrice
        }
      ]
    }
  });
}
bitcoinsInfo();

/*
stockInfo.get(`${stockTicket}/chart`)
    .then(response => {
      printTheChart(response.data);
    })
    .catch( error => {
      console.log(error);
  });

const printTheChart = (stockData => {
  const stockLabels = stockData.map( element => element.date);
  const stockPrice = stockData.map( element => element.close);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
});*/