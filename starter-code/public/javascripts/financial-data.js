// let fromListener = "2018-10-01";
// let toListener = "2018-10-08";
// let myUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromListener}&end=${toListener}`;

/*document.getElementById("date-from-input").onchange = function() {
  getBitCoinData(document.getElementById("date-from-input").value, document.getElementById("date-to-input").value);
  
};*/

document.getElementById("date-from-input").addEventListener("change", function() {
  getBitCoinData(document.getElementById("date-from-input").value, document.getElementById("date-to-input").value);
});

document.getElementById("date-to-input").addEventListener("change", function() {
  getBitCoinData(document.getElementById("date-from-input").value, document.getElementById("date-to-input").value);
});

document.getElementById("currency-selector").addEventListener("change", function() {
  getBitCoinData(document.getElementById("date-from-input").value, document.getElementById("date-to-input").value);
});

function drawCompanyResultsChart(fecha, valor) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fecha,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          data: valor
        }
      ]
    }
  });
}

function getBitCoinData(start, end){
  let params = '?';
  let endDate = new Date();
  if (start !== ''){
    let startDate = new Date(start);
    if (end !==''){
      endDate = new Date(end);
    }
    
    if (startDate < endDate){
      params += 'start='+startDate.toISOString().split('T')[0]+'&end='+endDate.toISOString().split('T')[0];
    }
  }
  params += '&currency='+document.getElementById('currency-selector').value;

  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`+params).then(bitcoinData => {
    const data = bitcoinData.data.bpi;
    //  const bitcoinValueArray= Object.keys(data).map(i=> data[i])
    const bitcoinArray = Object.entries(data);
    const bitcoinDate = bitcoinArray.map(elem => elem[0]);
    const bitcoinPrices = bitcoinArray.map(elem => elem[1]);

    document.getElementById('minVal').innerText = Math.min.apply(null,bitcoinPrices).toFixed(2);
    document.getElementById('maxVal').innerText = Math.max.apply(null,bitcoinPrices).toFixed(2);
    
    drawCompanyResultsChart(bitcoinDate, bitcoinPrices);
  });
  
}

  getBitCoinData('','');