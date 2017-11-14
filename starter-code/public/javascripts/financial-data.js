window.onload = function() {

    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
      .then(function(response) {
          console.log(response.data.bpi);
          var data = response.data.bpi;
          var dates = Object.keys(data);
          var prices = Object.values(data);

          var ctx = document.getElementById("myChart").getContext('2d');
          var myLineChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: dates,
                datasets: [{
                  label: "Bitcoin price",
                  data: prices,
                }]
              },
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: false
                    }
                  }]
                }
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
        }
