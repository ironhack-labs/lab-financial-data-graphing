var $fromDate = document.getElementById('dataFrom');
var $toDate = document.getElementById('dataTo');
var toDate = $toDate.value;
var fromDate = $fromDate.value;

render(fromDate, toDate);

$fromDate.addEventListener('change', event => {
  fromDate = $fromDate.value;
  render(fromDate, toDate);
});

$toDate.addEventListener('change', event => {
  toDate = $toDate.value;
  render(fromDate, toDate);
});

function render(fromD, toD) {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    )
    .then(bpiData => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',

        data: {
          labels: Object.keys(bpiData.data.bpi),
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(bpiData.data.bpi),
            },
          ],
        },
      });
    })
    .catch(error => {
      console.log('Error is: ', error);
    });
}
