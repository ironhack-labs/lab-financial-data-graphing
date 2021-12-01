let url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
const currency = 'USD';

let fromDateElem = document.querySelector('#fromDate');
let fromDate = document.querySelector('#fromDate').value;
let toDateElem = document.querySelector('#toDate');
let toDate = document.querySelector('#toDate').value;

const getHistoricalData = async (fromDate, toDate) => {
  try {
    if (fromDate && toDate) {
      url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;
    }

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

getHistoricalData(fromDate, toDate);

fromDateElem.addEventListener('change', function (event) {
  fromDate = event.target.value;
  getHistoricalData(fromDate, toDate);
});

toDateElem.addEventListener('change', function (event) {
  toDate = event.target.value;
  getHistoricalData(fromDate, toDate);
});
