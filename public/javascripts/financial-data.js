const startDate = document.getElementById('startdate');
const endDate = document.getElementById('enddate');
const currency = document.getElementById('currency');
const max = document.getElementById('max');
const min = document.getElementById('min');

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let apiUrlGet = apiUrl;

updateGraph();

document.body.onchange = evt => {
  if (evt.target.id === 'startDate' || 'endDate') {
    if (startDate.value && endDate.value) {
      apiUrlGet = `${apiUrl}?currency=${currency.value}&start=${startDate.value}&end=${endDate.value}`;
      updateGraph();
    }
  }

  if (evt.target.id === 'currency') {
    if (startDate.value && endDate.value) {
      apiUrlGet = `${apiUrl}?currency=${currency.value}&start=${startDate.value}&end=${endDate.value}`;
      updateGraph();
    } else {
      apiUrlGet = `${apiUrl}?currency=${currency.value}`;
      updateGraph();
    }
  }
};

function updateGraph() {
  console.log(apiUrlGet);
  axios
    .get(apiUrlGet)
    .then(responseFromAPI => {
      const values = Object.values(responseFromAPI.data.bpi);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      console.log(maxValue, minValue);
      max.innerText = `Max: ${maxValue} ${currency.value}`;
      min.innerHTML = `Min: ${minValue} ${currency.value}`;
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log('Error while getting the data: ', err));
}

function printTheChart(data) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data.bpi),
      datasets: [{
        backgroundColor: 'rgba(64, 64, 64, 0.1)',
        borderColor: 'lightgrey',
        label: 'Bitcoin Price Index',
        data: Object.values(data.bpi),
      }],
    },
  });
}
