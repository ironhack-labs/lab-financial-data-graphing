const dateFromInput = document.getElementById('date-from');
const dateToInput = document.getElementById('date-to');
const currencyInput = document.getElementById('select-currency');
const minValue = document.getElementById('min-value');
const maxValue = document.getElementById('max-value');
let from = dateFromInput.value;
let to = dateToInput.value;
let currency = currencyInput.value;


window.addEventListener('load', getInfo(from, to, currency));
dateFromInput.addEventListener('input', () => {
  from = dateFromInput.value;
  getInfo(from, to, currency);
});

dateToInput.addEventListener('input', () => {
  to = dateToInput.value;
  getInfo(from, to, currency);
});

currencyInput.addEventListener('input', () => {
  currency = currencyInput.value;
  getInfo(from, to, currency);
});


function getInfo(from, to, currency) {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${from}&end=${to}` )
        .then(response => {
          findMinMax(response.data.bpi);
          printChart(response.data);
        })
        .catch(error => console.error(error));
};

function findMinMax(bpi) {
  const values = Object.values(bpi);
  const min = Math.min(...values);
  const max = Math.max(...values);

  minValue.innerText = min + currency;
  maxValue.innerText = max + currency;
}


const ctx = document.getElementById('myChart').getContext('2d');

function printChart(bpiData) {
  const dailyData = bpiData.bpi;
 
  const bpiDates = Object.keys(dailyData);
  const ratePrices = bpiDates.map(date => dailyData[date]);
 
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bpiDates,
      datasets: [
        {
          label: 'Bitcoin Rate',
          backgroundColor: 'transparent',
          borderColor: 'rgb(255, 99, 132)',
          data: ratePrices
        }
      ]
    }
  }); 
}