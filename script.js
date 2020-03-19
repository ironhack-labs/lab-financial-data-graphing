var $fromDate = document.getElementById('dataFrom');
var $toDate = document.getElementById('dataTo');
var toDate = $toDate.value;
var fromDate = $fromDate.value;

//Graph from-date
$fromDate.addEventListener('change', () => {
  fromDate = $fromDate.value;
  toDate = $toDate.value;
  axios
    .get( `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
    .then(bpiData => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {

        type: 'line',

        data: {
          labels: Object.keys(bpiData.data.bpi),
          datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(bpiData.data.bpi),
            },],
        },
      });
    })
    .catch(error => {
      console.log('Error is: ', error);
    });
});

//Graph to-date
$toDate.addEventListener('change', () => {
  toDate = $toDate.value;
  fromDate = $fromDate.value;
  axios
    .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
    .then(bpiData => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {

        type: 'line',

        data: {
          labels: Object.keys(bpiData.data.bpi),
          datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(bpiData.data.bpi),
            },],
        },
      });
    })
    .catch(error => {
      console.log('Error is: ', error);
    });
});


//Graph showing
axios
  .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
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
          },],
      },
    });
  })
  .catch(error => {
    console.log('Error is: ', error);
  });