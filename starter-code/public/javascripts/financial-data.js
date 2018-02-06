'use strict';

function main () {
  let xAxisDates;
  let yAxisBtcValues;

  const startDate = document.querySelector('#start-date');
  const endDate = document.querySelector('#end-date');
  const currency = document.querySelector('select');

  endDate.addEventListener('change', drawChart);
  currency.addEventListener('change', drawChart);

  function drawChart () {
    const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}&currency=${currency.value}`;
    console.log(url);
    axios.get(url)
      .then((response) => {
        xAxisDates = Object.keys(response.data.bpi);
        yAxisBtcValues = Object.values(response.data.bpi);
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xAxisDates,
            datasets: [{
              label: 'btc price',
              data: yAxisBtcValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
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
        // console.log(yAxisBtcValues);
        // console.log(xAxisDates);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

window.onload = main;
