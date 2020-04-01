const urlApi = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const pMax = document.createElement('p');
const pMin = document.createElement('p');

const printTheChart = response => {
  // Object with dates and prices
  const datesAndPrices = response.data.bpi;
  // console.log(datesAndPrices);

  // Array with dates
  const arrayDates = Object.keys(datesAndPrices);

  // Array with prices
  const arrayPrices = arrayDates.map(date => datesAndPrices[date]);
  // console.log(arrayPrices);

  const maxAndMinValues = document.querySelector('#maxAndMinValues');

  const maxValue = Math.max(...arrayPrices);
  const minValue = Math.min(...arrayPrices);

  pMax.innerHTML = maxValue;
  pMin.innerHTML = minValue;

  maxAndMinValues.appendChild(pMax);
  maxAndMinValues.appendChild(pMin);

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: arrayDates, 
      datasets: [
        {
          label: 'Bitcoin Price Index',
          data: arrayPrices,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
};

axios
	.get(urlApi)
	.then(responseFromApi => {
		// console.log(responseFromApi);
		printTheChart(responseFromApi)
	})
	.catch(error => console.log(error));

const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');

const inputs = [fromInput, toInput];


inputs.forEach(input => input.addEventListener("change", () => {

  if(fromInput && toInput) {
    axios
    .get(urlApi + '?start=' + fromInput.value + '&end=' + toInput.value)
    .then(responseFromApi => {
      // console.log(responseFromApi);
      printTheChart(responseFromApi)
    })
    .catch(error => console.log(error));
  }
}));

const selectCurrency = document.querySelector('#selectCurrency');

selectCurrency.addEventListener("change", () => {
  console.log(selectCurrency.value);
  axios
    .get(urlApi + '?currency=' + selectCurrency.value + '&start=' + fromInput.value + '&end=' + toInput.value)
    .then(responseFromApi => {
      // console.log(responseFromApi);
      // console.log(responseFromApi);
      printTheChart(responseFromApi)
    })
    .catch(error => console.log(error));
});

