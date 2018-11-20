
window.onload = function () {

  const chartConfig = {};
  getApiDate();

  function getApiDate() {

    let urlApi = 'http://api.coindesk.com/v1/bpi/historical/close.json';

    if (chartConfig.dateStart && chartConfig.dateEnd) {
      urlApi += `?start=${chartConfig.dateStart}&end=${chartConfig.dateEnd}`
    }

    axios.get(urlApi)

      .then((bitCoinData) => {
        console.log(bitCoinData);
        printChart(bitCoinData);
      })
      .catch ((e) =>{
        console.log('OH MY GOD' + e);
      })
  }
  function printChart(bitCoinData) {

    const dateLabels = Object.keys(bitCoinData.data.bpi)
    const valueLabels = Object.values(bitCoinData.data.bpi)
    console.log(dateLabels);
    console.log(valueLabels);

    const ctx = document.getElementById('bitCoinCanvas').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateLabels,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          fill: false,
          tension: 0,
          pointHoverRadius: 20,
          borderColor: 'rgb(255, 99, 132)',
          data: valueLabels
        }]
      }
    });

  }
  function dateStartChanged(e) {

    chartConfig.dateStart = e.target.value;
    getApiDate();

    console.log(chartConfig.dateStart);
  }

  function dateEndChanged(e) {
    chartConfig.dateEnd = e.target.value;
    getApiDate();
    console.log(chartConfig.dateEnd);

  }


  document.getElementById('startDate').onchange = dateStartChanged;
  document.getElementById('endDate').onchange = dateEndChanged;


}

