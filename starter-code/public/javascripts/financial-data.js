const bpiInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/'
});

const inputStart = document.getElementById('date-start');
const inputEnd = document.getElementById('date-end');
const inputCur = document.getElementById('currency');
const inputMax = document.getElementById('max');
const inputMin = document.getElementById('min');

function initializeDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const monthAgo = ('0' + today.getMonth()).slice(-2);
  const date = ('0' + today.getDate()).slice(-2);
  inputEnd.value = `${year}-${month}-${date}`;
  inputStart.value = `${year}-${monthAgo}-${date}`;
}

function showByDefault() {
  bpiInfo
    .get('close.json')
    .then(response => {
      document.getElementById('error-message').innerText = '';

      const dates = [];
      const values = [];

      for (let date in response.data.bpi) {
        dates.push(date);
        values.push(response.data.bpi[date]);
      }

      const max = Math.max.apply(null, values);
      const min = Math.min.apply(null, values);

      inputMax.innerText = `Max: ${max} ${inputCur.value}`;
      inputMin.innerText = `Min: ${min} ${inputCur.value}`;

      printChart(dates, values);
    })
    .catch(err => {
      console.log(err);
    });
}

function showInfo(start, end, currency = 'USD') {
  bpiInfo
    .get(`close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
      document.getElementById('error-message').innerText = '';

      const dates = [];
      const values = [];

      for (let date in response.data.bpi) {
        dates.push(date);
        values.push(response.data.bpi[date]);
      }

      const max = Math.max(...values);
      const min = Math.min(...values);

      inputMax.innerText = `Max: ${max} ${inputCur.value}`;
      inputMin.innerText = `Min: ${min} ${inputCur.value}`;

      printChart(dates, values);
    })
    .catch(err => {
      document.getElementById('error-message').innerText = err;
    });
}

function printChart(dates, values) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          backgroundColor: 'pink',
          borderColor: 'rgb(255, 99, 132)',
          data: values
        }
      ]
    }
  });
}

inputStart.onchange = function() {
  showInfo(inputStart.value, inputEnd.value, inputCur.value);
};
inputEnd.onchange = function() {
  showInfo(inputStart.value, inputEnd.value, inputCur.value);
};
inputCur.onchange = function() {
  showInfo(inputStart.value, inputEnd.value, inputCur.value);
};

initializeDate();
showByDefault();
