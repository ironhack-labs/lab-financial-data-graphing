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

// Checking for dates
const beforeAfter = function(from, to) {
  const initial = new Date(from);
  const final = new Date(to);
  if (from || to) {
    return initial.getTime() <= final.getTime()
      ? console.log('Good')
      : console.log('Invalid date configuration!');
  } else {
    return console.log('You can set the dates!');
  }
};

document.querySelector('#button').onclick = function() {
  const from = document.querySelector('#from').value;
  const to = document.querySelector('#to').value;
  beforeAfter(from, to);
  const response = Price.getDate(from, to);
  response.then(res => {
    const { bpi } = res.data;
    const years = Object.keys(bpi);
    const price = Object.values(bpi);
    chart.data.labels = [...years];
    chart.data.datasets[0] = {
      label: 'Bitcoin price index',
      data: [...price],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)'
    };
    chart.update();
  });
};
