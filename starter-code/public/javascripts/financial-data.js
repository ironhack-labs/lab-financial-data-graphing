const printTheChart = ((dataAnswer) => {
  const labels = Object.keys(dataAnswer);
  const price = labels.map((item) => {
    return dataAnswer[item];
  });
  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'BitCoin Index',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: price,
        borderWidth: 3,
      }]
    }
  });
});

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then((response) => {
    printTheChart(response.data.bpi)
    const dates = Object.values(response.data.bpi);
  })
  .catch((error) => {
    console.log(error);
  });


function getDateMap(startDate, endDate, currency) {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&&currency=${currency}`)
    .then((response) => {
      console.log(response)
      printTheChart(response.data.bpi);
    })
    .catch(err => console.log(err));
}


document.getElementById('theButton').onclick = function () {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const currency = document.getElementById('currency').value;
  getDateMap(startDate, endDate, currency);
};