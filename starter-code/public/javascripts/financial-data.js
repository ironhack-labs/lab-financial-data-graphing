function main () {
  const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getData (id) {
    coinDeskApi.get(id)
      .then(response => {
        // separate key and value into different arrays
        const data = getSeparateData(response.data.bpi);
        const xData = data[0];
        const yData = data[1];

        // create the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xData,
            datasets: [{
              label: 'Bitcoin Price Index',
              data: yData,
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
      .catch((err) => {
        console.error(err);
      });
  }

  function getSeparateData (data) {
    const data1 = [];
    const data2 = [];

    for (let property in data) {
      if (!data.hasOwnProperty(property)) {
        continue;
      }

      data1.push(property);
      data2.push(data[property]);
    }
    return [data1, data2];
  }

  getData();
}
window.onload = main;
