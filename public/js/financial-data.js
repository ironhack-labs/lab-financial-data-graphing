const DateTime = luxon.DateTime;
// const now = 

let currency = '';
let endDate = DateTime.now();
let startDate = endDate.minus({months: 1});

window.addEventListener('load', () => {
    populateAndRenderChart(startDate, endDate);
    populateAndRenderCurrencies('https://openexchangerates.org/api/currencies.json');
});

const populateAndRenderCurrencies = async (api) => {
  try {
    const  results = await axios.get(api);
    renderCurrencies(results.data);
  } catch (e) {
    e => console.log('Error while getting the data: ', e);
  }
};

const populateAndRenderChart = async (startDate, endDate, currency = 'USD') => {
  try {
      const api = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate.toISODate()}&end=${endDate.toISODate()}`;
      console.log(api)
      const results = await axios.get(api);
      renderChart(results.data);
      renderMaxMin(results.data);
    } catch (e) {
      e => console.log('Error while getting the data: ', e);
    }
};

//

//
function renderCurrencies(currencyData) {
  const select = document.getElementById('currency_select');
  //the currencies codes are the object keys
  const currencies = Object.keys(currencyData);
  console.log(`these are the currs : ${currencies} type : ${currencies.length}`);
  currencies.forEach ((curr) => {
    const option = document.createElement('option');
    option.value = curr;
    option.text = curr;
    select.add(option);
    // console.log(curr);  
  });
}


function renderChart(bitCoinData) {
  //returns an object where dates are the keys, prices are the values
  const dailyData = bitCoinData.bpi;
  console.log('daily', dailyData)
  //returns an array of all the keys in the dailyData object
  const bitCoinDates = Object.keys(dailyData);
  //returns an array of all the values in the dailyData
  const bitCoinPrices = Object.values(dailyData);
  console.log('prices', bitCoinPrices)

  const currencyValues = Object.values(bitCoinData.bpi);
  //spread the currencyValues array and finds the min and max
  const minVal = Math.min(...currencyValues);
  const maxVal = Math.max(...currencyValues);
  document.getElementById('min').innerText = minVal + currency;
  document.getElementById('max').innerText = maxVal + currency;

  const ctx = document.getElementById('bitcoin_price_index_chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitCoinDates,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          backgroundColor: '#ed6599',
          borderColor: '#cd0e4f',
          data: bitCoinPrices
        }
      ]
    }
  });
} 


    
document.getElementById('start_date').addEventListener('change', () => {
    console.log(startDate);
    startDate = DateTime.fromISO(document.getElementById('start_date').value);
    populateAndRenderChart(startDate, endDate, currency);
});
document.getElementById('end_date').addEventListener('change', () => {
    endDate = DateTime.fromISO(document.getElementById('end_date').value);
    populateAndRenderChart(startDate, endDate, currency);
});
document.getElementById('currency_select').addEventListener('change', () => {
    currency = document.getElementById('currency_select').value;
    populateAndRenderChart(startDate, endDate, currency);
    console.log({currency})
});


    
