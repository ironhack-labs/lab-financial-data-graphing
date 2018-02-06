
function main () {
  const coinApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getCoinInfo (id) {
    coinApi.get(id)
      .then(response => {
        console.log(response.data);
        const data = response.data.bpi;
        const canvas = document.getElementById('my-chart');
        const ctx = canvas.getContext('2d');

        // let keyArray = [];
        // let valueArray = [];
        let dataArray = [];
        for (let key in data) {
        //   keyArray.push(key);
        //   valueArray.push(data[key]);
          dataArray.push({x: key, y: data[key]});
        }

        console.log(dataArray);

        const lineChart = new Chart(ctx, {
          data: data,
          type: 'line',
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
    console.log('ok');
    getCoinInfo('');
  };
}

window.onload = main;
