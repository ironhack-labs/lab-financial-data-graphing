axios({
  method: 'GET',
  url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})
  .then(response => {
    // Here we can do something with the response object
  })
  .catch(err => {
    // Here we catch the error and display it
  });

class BPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getDate(date1, date2) {
    return date1 && date2
      ? axios.get(`${this.baseURL}?start=${date1}&end=${date2}`)
      : axios.get(`${this.baseURL}`);
  }
}

const Price = new BPI('http://api.coindesk.com/v1/bpi/historical/close.json');
/*
document.querySelector('#button').onclick = function() {
  const response = axios.get(
    `http://api.coindesk.com/v1/bpi/historical/close.json`
  );
  response.then(res => {
    console.log(res);
    const bpi = res.data.bpi;
    const years = Object.keys(bpi);
    const price = Object.values(bpi);
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Bitcoin price index',
            data: price
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
};*/

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
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

function removeData(ch) {
  ch.data.labels.pop();
  ch.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });
  ch.update();
}
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  chart.update();
}

document.querySelector('#button').onclick = function() {
  const from = document.querySelector('#from').value;
  const to = document.querySelector('#to').value;
  console.log(from, to);
  const response = Price.getDate(from, to);
  response.then(res => {
    console.log(res);
    const { bpi } = res.data;
    const years = Object.keys(bpi);
    const price = Object.values(bpi);
    removeData(chart);
    chart.data.labels.push(...years);
    chart.data.datasets.push({
      label: 'Bitcoin price index',
      data: [...price]
    });
    chart.update();
  });
};
