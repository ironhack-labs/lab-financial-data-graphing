
const base = 'https://api.coindesk.com/v1/bpi/historical/close.json';   

const getData = (startDate, endDate, currency) => {
  axios.get(`${base}?currency=${currency}&start=${startDate}&end=${endDate}`)
  .then(res => {
    let [chartLabels, chartValues] = [[],[]];
    for (key in res.data.bpi) {
      chartLabels.push(key);
      chartValues.push(res.data.bpi[key]);
    }

    let min = Math.min(...chartValues).toFixed(2);
    let max = Math.max(...chartValues).toFixed(2);
    document.getElementById('min').innerHTML = `Minimum close: ${currency} ${min}`;
    document.getElementById('max').innerHTML = `Maximum close: ${currency} ${max}`;
    

    setChart(chartLabels, chartValues);
  })
  .catch(err => console.log(err));
}

const setChart = (chartLabels, chartValues) => {
  let myChart = new Chart(document.getElementById('myChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Close', 
          data: chartValues,
        }
      ]
    },
  });
}

document.getElementById('currency').addEventListener('change', () => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const currency = document.getElementById('currency').value;

  getData(startDate, endDate, currency);
});


