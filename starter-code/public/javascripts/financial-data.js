function init() {
  const date = new Date();
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');

  endDate.value = formatDate(date);
  date.setMonth(date.getMonth() - 1);
  startDate.value = formatDate(date);
  loadData();
  addCurrencyListener();

  startDate.addEventListener('change', loadData);
  endDate.addEventListener('change', loadData);
}

function addCurrencyListener() {
  const currency = document.getElementById('currency');
  currency.addEventListener('change', loadData);
}

function loadData() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const currency = document.getElementById('currency').value;
  axios
    .get(`//api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(handleDataLoaded)
    .catch(console.error);
}

function handleDataLoaded(response) {
  const labels = Object.keys(response.data.bpi);
  const values = Object.values(response.data.bpi);
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);

  const minEl = document.getElementById('min');
  const maxEl = document.getElementById('max');

  minEl.innerText = min;
  maxEl.innerText = max;

  const ctx = document.getElementById('chart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          data: values
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function formatDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

init();
