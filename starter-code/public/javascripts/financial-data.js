
window.onload = function () {

  const chartConfig = {
    currency: document.getElementById('selectCurrency').value
  };
  getApiDate();

  function getApiDate() {

    const today = new Date();
    const todayToString = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
    let urlApi = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${chartConfig.currency}`;

    if (chartConfig.dateStart && chartConfig.dateEnd) {
      urlApi += `&start=${chartConfig.dateStart}&end=${chartConfig.dateEnd}`
      if (chartConfig.dateEnd < chartConfig.dateStart || chartConfig.dateStart >= todayToString) {
        return;
      }
    }
    axios.get(urlApi)
      .then((bitCoinData) => {
        printChart(bitCoinData);
      })
      .catch((e) => {
      })
  }
  function printChart(bitCoinData) {
    const dateLabels = Object.keys(bitCoinData.data.bpi)
    const valueLabels = Object.values(bitCoinData.data.bpi)   
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
  }

  function dateEndChanged(e) {
    chartConfig.dateEnd = e.target.value;
    getApiDate();
  }

  function currencyChanged(e){
    chartConfig.currency = e.target.value;
    getApiDate();
  }

  document.getElementById('startDate').onchange = dateStartChanged;
  document.getElementById('endDate').onchange = dateEndChanged;

  document.getElementById('selectCurrency').onchange = currencyChanged;

}

