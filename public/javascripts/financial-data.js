const dateFromInput = document.getElementById('date-from');
const dateToInput = document.getElementById('date-to');
const currencyInput = document.getElementById('select-currency');
let from = dateFromInput.value;
let to = dateToInput.value;
let currency = currencyInput.value;

window.addEventListener('load', getInfo(from, to));

dateFromInput.addEventListener('input', () => {
  from = dateFromInput.value;
  getInfo(from, to);
});

dateToInput.addEventListener('input', () => {
  to = dateToInput.value;
  getInfo(from, to);
});


function getInfo(from, to) {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}` )
        .then(response => printChart(response.data))
        .catch(error => console.error(error));
}


const ctx = document.getElementById('myChart').getContext('2d');

function printChart(bpiData) {
  const dailyData = bpiData['bpi'];
  console.log('Daily Data: ' + dailyData)
 
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
  }); // closes chart = new Chart()
} // closes printTheChart()