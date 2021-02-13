const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

axios.get(apiUrl)
  .then((response) => {
    const {data} = response
    //console.log(data);
    const xAxis = Object.keys(data["bpi"]);
    const yAxis = Object.values(data["bpi"]);
    drawChart(xAxis,yAxis)
  })
  .catch((error) => {
    console.log(error);
  })

  const drawChart= (xAxis,yAxis) => {
    const ctx = document.getElementById("myChart").getContext("2d")

    const chart = new Chart(ctx, {
        type: 'line',
        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Date',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxis
            }]
        },
        // Configuration options go here
        options: {}
    })
  }