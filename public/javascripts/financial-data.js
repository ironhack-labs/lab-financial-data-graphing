const ctx = document.getElementById('myChart').getContext('2d')

const filterLoad = () => {
  console.log('entre')

  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value
  const chartUrl =
    `http://api.coindesk.com/v1/bpi/historical/close.json?start=` +
    `${startDate}` +
    '&end=' +
    `${endDate}`
  console.log(chartUrl)

  axios
    .get(chartUrl)
    .then(({ data }) => {
      const dates = Object.keys(data.bpi)
      const values = Object.values(data.bpi)
      console.log(dates)
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: '# of Confirmed',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        },
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
