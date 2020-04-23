const ctx = document.getElementById('bitCoin').getContext('2d')

const filterLoad = () => {
  const initDate = document.getElementById('start-date').value
  const finalDate = document.getElementById('final-date').value
  const chartUrl =
    `http://api.coindesk.com/v1/bpi/historical/close.json?start=` +
    `${initDate}` +
    '&end=' +
    `${finalDate}`

  axios
    .get(chartUrl)
    .then(({ data }) => {
      const dates = Object.keys(data.bpi)
      const values = Object.values(data.bpi)
      const blockChain = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'BitCoin behavior figures',
              data: values,
              backgroundColor: ['rgba(94, 240, 200, 1)'],
              borderColor: [
                'rgba(255, 100, 132, 1)',
                'rgba(54, 299, 235, 1)',
                'rgba(255, 359, 86, 1)',
                'rgba(75, 100, 192, 1)',
                'rgba(153, 120, 120, 1)',
                'rgba(105, 159, 64, 1)',
                'rgba(55, 229, 204, 1)',
                'rgba(255, 50, 100, 1)',
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
