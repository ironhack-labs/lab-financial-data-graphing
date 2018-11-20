
window.onload = function () {

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)

    .then((bitCoinData) => {
      console.log(bitCoinData);
      printChart(bitCoinData);

    })


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



}

