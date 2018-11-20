
window.onload = function () {

  const chartConfig = {
    currency: document.getElementById('selectCurrency').value
  };
  getApiDate();

  function getApiDate() {   

    let urlApi = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${chartConfig.currency}`;
    if (chartConfig.dateStart && chartConfig.dateEnd) {
      urlApi += `&start=${chartConfig.dateStart}&end=${chartConfig.dateEnd}`
      if (chartConfig.dateEnd < chartConfig.dateStart) {
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
          backgroundColor: 'rgba(233, 233, 233,.3)',
          fill: true,
          tension: .2,
          pointHoverRadius: 20,
          borderColor: 'rgb(233, 233, 233)',
          data: valueLabels
        }]
      }
    });

    document.querySelector('.maxNumber').innerText = Math.max.apply(null,valueLabels);
    document.querySelector('.minNumber').innerText = Math.min.apply(null,valueLabels);
    document.querySelectorAll('.currency').forEach((e) => e.innerHTML = chartConfig.currency); 
   
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

