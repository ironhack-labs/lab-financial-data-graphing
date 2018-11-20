window.onload = function() {
  function ajaxrequest() {
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then(response => {
        console.log(response.data.bpi);
        printTheChart(response.data.bpi);
      })
  }

  function getDataFromApi() {
    ajaxrequest();
  }

  const printTheChart = (dataObject) => {
    const stockLabels = Object.keys(dataObject);
    const stockPrice = Object.values(dataObject);
    const ctx = document.getElementById('mycanvas').getContext('2d');

    console.log(stockLabels,stockPrice);

    //here we give the chart the data it needs
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: 'rgb(255, 99, 132)',
                fill: true,
                tension: 0,
                pointHoverRadius: 20,
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrice,
            }]
        }
    });
};

  document.getElementById("getData").onclick = getDataFromApi;
};
