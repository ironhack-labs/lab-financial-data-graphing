/* DOM nodes */
const ctx = document.querySelector('canvas').getContext('2d');
const $start = document.querySelector('#start');
const $end = document.querySelector('#end');
const $currency = document.querySelector('#currency');
const $max = document.querySelector('#max');
const $min = document.querySelector('#min');
const $chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Bitcoin Price Index',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      }
    ]
  }
});

/* Event listeners */
$start.addEventListener('change', updateChart);
$end.addEventListener('change', updateChart);
$currency.addEventListener('change', updateChart);
document.addEventListener('DOMContentLoaded', () => {
  setDefaultDates();
  updateChart();
});

/* This function updates the info of the chart, max and min */
function updateChart() {
  const generateEndpoint = () => {
    const q = {
      start: $start.value,
      end: $end.value,
      currency: $currency.value
    };

    const query = Object.keys(q)
      .map(key => `${key}=${q[key]}`)
      .join('&');

    return `http://localhost:3000/api?${query}`;
  };

  const endpoint = generateEndpoint();

  axios.get(endpoint).then(bpi => {
    const labels = Object.keys(bpi.data);
    const data = Object.values(bpi.data);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const currency = $currency.value;

    $max.innerText = `${max} ${currency}`;
    $min.innerText = `${min} ${currency}`;

    $chart.data.labels = labels;
    $chart.data.datasets[0].data = data;
    $chart.update();
  });
}

/* Sets the default times */
function setDefaultDates() {
  const makeDateString = date => {
    const twoDigits = n => `0${n}`.slice(-2);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${twoDigits(month)}-${twoDigits(day)}`;
  };
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const startDate = makeDateString(start);
  const endDate = makeDateString(end);

  $start.value = startDate;
  $end.value = endDate;
}
