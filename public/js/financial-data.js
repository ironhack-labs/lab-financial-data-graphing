const minValue = document.querySelector('.minValue span');
const maxValue = document.querySelector('.maxValue span');


// Axios request to get data from Api
const getData = async (startDate, endDate) => {
  const endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  const dataFromApi = await axios.get(endpoint);
  const dataFromApiValues = dataFromApi.data.bpi;
  return dataFromApiValues;
}

// Add chart based on the data
const getChart = async (startDate, endDate) => {
  // get data from Axios request 

  const resultFromApi = await getData(startDate, endDate); 
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
  console.log('click');
  const startDateFromInput = document.querySelector("#start-date").value;
  console.log(startDateFromInput)
  const endDateFromInput = document.querySelector("#end-date").value;
  console.log(endDateFromInput)
  getChart(startDateFromInput, endDateFromInput)
});

//getChart('2013-09-01', '2013-09-05');




