let myChart

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d')
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = 'lighBlue'
    ctx.fillRect(25, 50, chart.width, chart.height)
    ctx.restore()
  },
}

const strokeChart = (labels, prices) => {
  const ctx = document.getElementById('myChart').getContext('2d')
  ctx.fillStyle = 'lightGreen'

  if (window.myChart instanceof Chart) {
    window.myChart.destroy()
  }

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          data: prices,
          backgroundColor: ['rgba(191, 191, 191, 1)'],
          borderColor: ['rgba(191, 191, 191, 1)'],
          borderWidth: 1,
        },
      ],
    },
    // plugins: [plugin],
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  })
  //
}

const getBitCloseFullService = (fromDate, toDate, currency) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`,
    )
    .then((response) => {
      const timeSeries = response.data['bpi']
      const labels = Object.keys(timeSeries)
      const prices = Object.values(timeSeries)
      strokeChart(labels, prices)
    })
    .catch((err) => {
      console.log(err)
    })
}
