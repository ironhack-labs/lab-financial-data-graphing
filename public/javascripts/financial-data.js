// let startDate = '2020-08-21';
// let endDate = '2020-09-21';
// let currency = 'USD';
// let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;

//carregaGrafico();
atualizarGrafico();

function carregaGrafico(){
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        //console.log('The response from API: ', responseFromAPI);
        printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
      })
    .catch(err => console.log('Error while getting the data: ', err));
};


function printTheChart(bitData) {
  const dailyData = bitData['bpi'];
 
  const bitDates = Object.keys(dailyData);
  const bitPrices = bitDates.map(date => dailyData[date]);

  document.getElementById("maxValue").innerHTML = Math.max.apply(null, bitPrices);
  document.getElementById("minValue").innerHTML = Math.min.apply(null, bitPrices);

  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitDates,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          //backgroundColor: 'rgb(125, 100, 60)',
          borderColor: 'rgb(64, 54, 206)',
          data: bitPrices
        }
      ]
    }
  }); // closes chart = new Chart()
};

document.getElementById("dtIni").addEventListener('change', atualizarGrafico);
document.getElementById("dtFim").addEventListener('change', atualizarGrafico);
document.getElementById("currency").addEventListener('change', atualizarGrafico);

/* function */
function atualizarGrafico() {
  startDate = document.getElementById("dtIni").value;
  endDate = document.getElementById("dtFim").value;
  currency = document.getElementById("currency").value;
  apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;  
  carregaGrafico();
};

