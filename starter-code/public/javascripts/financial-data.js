// import { response } from 'express';

document.querySelector('#from').value = '2013-09-01';
document.querySelector('#to').value = '2013-09-05';

function render() {
  let startDate = document.querySelector('#from').value;
  let endDate = document.querySelector('#to').value;
  console.log(startDate, endDate);
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    )
    .then(response => {
      console.log(response.data.bpi);
      const dataSet = response.data;
      var lineChart = document.getElementById('charts');

      // console.log(dataSet);
      var labels = Object.keys(dataSet.bpi);
      var valuesOfLables = Object.values(dataSet.bpi);

      var myChart = new Chart(lineChart, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: valuesOfLables,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
}
render();
document.querySelector('#from').onchange = () => {
  console.log('hello');
  render();
};
document.querySelector('#to').onchange = () => {
  console.log('bye');
  render();
};
