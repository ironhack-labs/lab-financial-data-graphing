'use strict';
function main () {
  const coinApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });
  const data1 = [];
  const data2 = [];
  function getCoinInfo (bpi) {
    coinApi.get(bpi)
      .then(response => {
        for (const property in response.data.bpi) {
          if (!response.data.bpi.hasOwnProperty(property)) {
            continue;
          }

          data1.push(property);
          data2.push(response.data.bpi[property]);
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        const stackedLine = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data1,
            datasets: [{
              label: '# of Votes',
              data: data2,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  document.getElementById('coinButton').onclick = function () {
    getCoinInfo();
  };
}

window.onload = main;
