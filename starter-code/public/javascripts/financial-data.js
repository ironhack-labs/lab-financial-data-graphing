const ctx = document.querySelector('#bitCoinChart').getContext('2d');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const currency = document.querySelector('#currency');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const errorDiv = document.querySelector('#error');

const createGraph = async (start, end, currency = 'USD') => {
  errorDiv.style.display = 'none';
  const bitcoindata = await axios.get(
    `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}${
      start && end ? `&start=${start}&end=${end}` : ''
    }`
  );

  const labels = [];
  const data = [];

  for (let key in bitcoindata.data.bpi) {
    labels.push(key);
    data.push(bitcoindata.data.bpi[key]);
  }

  const minValue = data.reduce((accum, currentValue) => {
    if (accum < currentValue) return accum;
    return currentValue;
  });

  const maxValue = data.reduce((accum, currentValue) => {
    if (accum > currentValue) return accum;
    return currentValue;
  });

  min.innerHTML = `<b>Min:</b> ${minValue.toFixed(2)} ${currency}`;
  max.innerHTML = `<b>Max:</b> ${maxValue.toFixed(2)} ${currency}`;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `Bitcoin price in ${currency}`,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data
        }
      ]
    },
    options: {}
  });
};

createGraph().catch(e => {
  errorDiv.style.display = '';
});

const changeGraphic = () => {
  const startValue = start.value;
  const endValue = end.value;
  const currencyValue = currency.value;

  createGraph(startValue, endValue, currencyValue).catch(e => {
    errorDiv.style.display = '';
  });
};

start.onchange = changeGraphic;
end.onchange = changeGraphic;
currency.onchange = changeGraphic;
