let currency = 'USD';
let fromDate = '2021-10-01';
let toDate = new Date().toISOString().split('T')[0];

const fromDateElem = document.querySelector('#fromDate');
// let fromDate = document.querySelector('#fromDate').value;
const toDateElem = document.querySelector('#toDate');
// let toDate = document.querySelector('#toDate').value;
const currencyElem = document.querySelector('#currency');

const getHistoricalData = async (fromDate, toDate, currency) => {
  try {
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;
    const data = await axios.get(url);
    printChart(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const printChart = (input) => {
  const dailyData = input.data['bpi'];
  console.log(dailyData);

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((date) => dailyData[date]);

  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices,
        },
      ],
    },
  }); // closes chart = new Chart()
};

getHistoricalData(fromDate, toDate, currency);

fromDateElem.addEventListener('change', function (event) {
  fromDate = event.target.value;
  getHistoricalData(fromDate, toDate, currency);
});

toDateElem.addEventListener('change', function (event) {
  toDate = event.target.value;
  getHistoricalData(fromDate, toDate, currency);
});

currencyElem.addEventListener('change', function (event) {
  currency = event.target.value;
  getHistoricalData(fromDate, toDate, currency);
});
