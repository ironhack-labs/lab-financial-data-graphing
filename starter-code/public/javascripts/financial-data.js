function main () {
  const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  });

  function getData (id) {
    return coinDeskApi.get(id)
      .then(response => response.data.bpi);
  }

  function filterData (data) {
    console.log('filter data console log');
    // NOT WORKING -- is a work in progress
    const startValue = document.getElementById('start').value;
    const endValue = document.getElementById('end').value;
    const filteredArr = [];
    data.forEach(function (data) {
      if (startValue >= data.key) {
        filteredArr.push();
      } else if (endValue <= data.key) {
        filteredArr.push();
      }
    });

    return data;
  }

  function renderData (data) {
    const xData = data[0];
    const yData = data[1];
    buildChart(xData, yData);
  }

  function prepareData (data) {
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

  function buildChart (x, y) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          label: 'Bitcoin Price Index',
          data: y,
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
  }

  document.getElementById('btn-filter').onclick = function () {
    filterData();
  };

  getData()
    .then(filterData)
    .then(prepareData)
    .then(renderData)
    .catch((err) => {
      console.error(err);
    });
}
window.onload = main;
