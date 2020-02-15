// Capture all the changing elements

const start = document.getElementById('start');
const end = document.getElementById('end');
const currency = document.getElementById('currency');
const params = {};

// Set the axios config

const API = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi',
  timeout: 5000
});

// Checking for min and max values

const minAndMax = function(values) {
  document.querySelector('#min').innerHTML = `${Math.min(...values)} ${
    currency.value
  }`;
  document.querySelector('#max').innerHTML = `${Math.max(...values)} ${
    currency.value
  }`;
};

// Checking for dates (to see if the config is valid)

const beforeAfter = function(from, to) {
  const initial = new Date(from.value);
  const final = new Date(to.value);
  if (from.value || to.value) {
    return initial.getTime() <= final.getTime()
      ? console.log('Good')
      : console.log('Invalid date configuration!');
  } else {
    return console.log('You can set the dates!');
  }
};

// Function to render the changes

const refresh = function(params) {
  console.log(params);
  API.get('/historical/close.json', { params }).then(res => {
    const { bpi } = res.data;
    const years = Object.keys(bpi);
    const price = Object.values(bpi).map(e => e.toFixed(2));
    minAndMax(price);
    beforeAfter(start, end);
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

// Event listener to see changes on the filters

start.addEventListener('change', e => {
  params.start = start.value;
  refresh(params);
});

end.addEventListener('change', e => {
  params.end = end.value;
  refresh(params);
});

currency.addEventListener('change', e => {
  params.currency = currency.value;
  refresh(params);
});

// Set the basic config for the chart
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

// Render the chart for the first time
refresh(params);
