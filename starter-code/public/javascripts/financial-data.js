function main () {
  axios({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
    // params: 'URL parameters to be sent with the request'
  })
    .then(response => {
      console.log(response.data);
      console.log(Object.values(response.data.bpi));
      var ctx = document.getElementById('myChart').getContext('2d');
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(response.data.bpi),
          datasets: [{
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(response.data.bpi)
          }]
        }
        // options: options
      });
    })
    .catch(err => {
      console.log(err);
    });
}

window.onload = main;
