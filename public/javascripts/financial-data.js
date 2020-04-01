// API URL
const urlApi = 'http://api.coindesk.com/v1/bpi/historical/close.json';

// HTML ELEMENTS
const pMax = document.createElement('p');
const pMin = document.createElement('p');
const maxAndMinValues = document.querySelector('#maxAndMinValues');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
const currencySelect = document.querySelector('#currencySelect');

// DATE CONFIG
const dateFormater = () => {
	const date = new Date();

	let month = date.getMonth() + 1;
	let day = date.getDate();
	let year = date.getFullYear();

	if (day < 10) day = `0${day}`;
	if (month < 10) month = `0${month}`;

	return `${year}-${month}-${day}`;
};

toInput.max = dateFormater();
toInput.value = dateFormater();
fromInput.max = dateFormater();
fromInput.value = dateFormater();

// REQUEST AND CHART
const printTheChart = responseFromApi => {
	// Object with dates and prices
	const datesAndPrices = responseFromApi.data.bpi;

	// Array with dates
	const arrayDates = Object.keys(datesAndPrices);

	// Array with prices
	const arrayPrices = arrayDates.map(date => datesAndPrices[date]);

	// Value config
	const maxValue = Math.max(...arrayPrices);
	const minValue = Math.min(...arrayPrices);

	pMax.innerHTML = `Max: ${maxValue.toFixed(2)} ${currencySelect.value}`;
	pMin.innerHTML = `Min: ${minValue.toFixed(2)} ${currencySelect.value}`;

	maxAndMinValues.appendChild(pMax);
	maxAndMinValues.appendChild(pMin);

	// Chart
	const ctx = document.getElementById('myChart').getContext('2d');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: arrayDates,
			datasets: [
				{
					label: 'Bitcoin Prices Chart',
					backgroundColor: 'rgba(233,233,233,0.6)',
					borderColor: 'rgb(185,185,185)',
					data: arrayPrices
				}
			]
		}
	});
};

// EVENT LISTENERS
const inputs = [fromInput, toInput, currencySelect];

inputs.forEach(input =>
	input.addEventListener('change', async () => {
		if (!fromInput.value || !toInput.value) return;

		try {
			const responseFromApi = await axios.get(
				`${urlApi}?currency=${currencySelect.value}&start=${fromInput.value}&end=${toInput.value}`
			);
			printTheChart(responseFromApi);
		} catch (error) {
			console.log(error);
		}
	})
);
