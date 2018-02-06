function main () {
  const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getData (id) {
    coinDeskApi.get(id)
      .then(response => {
        // separate key and value into different arrays
        const data = response.data.bpi;
        const data1 = [];
        const data2 = [];

        for (let property in data) {
          if (!data.hasOwnProperty(property)) {
            continue;
          }

          data1.push(property);
          data2.push(data[property]);
        }
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data1,
            datasets: [{
              label: 'Bitcoin Price Index',
              data: data2,
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

  getData();
}
window.onload = main;
