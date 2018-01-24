axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(function(data) {
      let dates = Object.keys(data.data.bpi);
      let values = Object.values(data.data.bpi);

      let minValue = Math.min( ...values );
      let maxValue = Math.max( ...values);

      console.log(minValue);
      console.log(maxValue);


      var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: "Bitcoin Price Index",
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundXolor: '#fff',
                pointborderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: values
              }

            ]
          },

          });


      })
    .catch(function(error) {
      handleErrors(error);
    });

    function handleErrors(err) {
      if (err.response) {
        console.log('Problem with the response', err.response.status);
      } else if (err.request) {
        console.log('Problem with the request');
      } else {
        console.log('Error', err.message);

      }
    }

    var ctx = document.getElementById("myChart").getContext("2d");
