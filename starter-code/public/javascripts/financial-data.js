function displayBpi(fromDate, toDate) {
  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json', {
    params: {
      start: fromDate.value,
      end: toDate.value
    }
  })
    .then((res) => {
      printTheChart(res.data.bpi);
    })
    .catch((error) => {
      console.log(error);
    });

  const printTheChart = ((bpi) => {
    const bpiDate = Object.keys(bpi);
    const bpiWorth = Object.values(bpi);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new myChart((ctx), {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: 'BPI Chart',
          backgroundColor: 'rgb(255, 99, 132',
          borderColor: 'rgd(255, 99, 132)',
          data: bpiWorth
        }]
      }
    });
  });
}

const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');

fromDate.addEventListener ('change', function () {
  displayBpi(fromDate, toDate); 
});

toDate.addEventListener ('change', function () {
  displayBpi(fromDate, toDate); 
});

