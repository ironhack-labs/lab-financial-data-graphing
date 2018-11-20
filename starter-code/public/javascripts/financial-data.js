
function drawCompanyResultsChart(fecha, valor){


    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fecha,
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132)',
              fill:false,
              borderColor: 'rgb(255, 99, 132)',
              data: valor,
              
          }]
        }
    });
    
}

axios
  .get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(bitcoinData => {
    const data = bitcoinData.data.bpi;
    //  const bitcoinValueArray= Object.keys(data).map(i=> data[i])
    const bitcoinArray = Object.entries(data);
    const bitcoinDate = bitcoinArray.map(elem => elem[0]);
    const bitcoinPrices = bitcoinArray.map(elem => elem[1]);

    console.log(bitcoinDate);
    drawCompanyResultsChart(bitcoinDate,bitcoinPrices);
  });


