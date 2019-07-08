const bitCoinInfo = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical"
})
let start;
let end;


document.getElementById("theButton").onclick = () => {
  start = document.getElementById("startDate").value
  end = document.getElementById("endDate").value
  if (start && end) {
    pepe(start, end)
  }
}

const pepe = (start, end) => {
  bitCoinInfo.get(`/clone.json?start=${start}&end=${end}`)

    .then(response => {
      printBitCoin(response.data.bpi)
      console.log(response.data.bpi)
    })
    .catch(error => console.log(error))
}

const ctx = document.getElementById('chart').getContext('2d');


let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: undefined,
    datasets: [{
      label: "Stock Chart",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: undefined,
    }]
  }
});

const printBitCoin = (bpi) => {

  const stockLabels = Object.keys(bpi)
  const stockPrice = Object.values(bpi)

  myChart.data.labels = stockLabels
  myChart.data.datasets[0].data = stockPrice

  myChart.update();




}


