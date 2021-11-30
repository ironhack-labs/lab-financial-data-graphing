const minValue = document.querySelector('.minValue span');
const maxValue = document.querySelector('.maxValue span');


// Axios request to get data from Api
const getData = async (startDate, endDate, currency) => {
  try {
    console.log(startDate, endDate, currency)
    let endpoint;
     (!startDate || !endDate)  // if there is no startdate and enddate selected
      // take the default from api
      ? endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?start` 
      // with the selected date, take the startDate, endDate
      : endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    //const endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    const dataFromApi = await axios.get(endpoint);
    const dataFromApiValues = dataFromApi.data.bpi;
    return dataFromApiValues;
  } catch(error) {
    console.error('Please enter start date, end date and currency', error);
  }
}

// Add chart based on the data
const getChart = async (startDate, endDate, currency) => {
  // get data from Axios request 

  const resultFromApi = await getData(startDate, endDate, currency); 
  //console.log(resultFromApi);// keys and values
  const labelsChart = Object.keys(resultFromApi); // ['2013-09-01', '2013-09-02', '2013-09-03', '2013-09-04', '2013-09-05']
  //console.log(labelsChart);
  // Iterate over keys to obtain the prices
  const pricesChart = Object.values(resultFromApi);
  //const pricesChart = labelsChart.map(date => resultFromApi[date]);
  //console.log(pricesChart);
  const getMaxValue = +Math.max(...pricesChart).toFixed(2);
  console.log(getMaxValue);
  maxValue.textContent = getMaxValue;

  const getMinValue = +Math.min(...pricesChart).toFixed(2);
  console.log(getMinValue);
  minValue.textContent = getMinValue;

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelsChart,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          data: pricesChart, // [1,2,3,...]
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        }
      ]
    }
  }); // closes chart = new Chart()
}

document.querySelector("#search-btn").addEventListener('click', () => {
  //console.log('click');
  const startDateFromInput = document.querySelector("#start-date").value;
  //console.log(startDateFromInput)
  const endDateFromInput = document.querySelector("#end-date").value;
  //console.log(endDateFromInput)
  const currencyInput = document.querySelector('#currency');
  const selectedCurrency = currencyInput.options[currencyInput.selectedIndex].value;
  //console.log(selectedCurrency)
  getChart(startDateFromInput, endDateFromInput, selectedCurrency)
});





