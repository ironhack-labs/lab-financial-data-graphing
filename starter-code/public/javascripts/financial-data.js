// Global variables
const baseURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?';
let initialDate = document.getElementById('initial-date').value;
let endDate = document.getElementById('last-date').value;
let currencyInput = document.getElementById('currency').value;

// Fetch API data
const callApi = async (initialDate, endDate, currency = 'USD') => {
	try {
		let response;
		if (initialDate && endDate) {
			response = await axios.get(`${baseURL}start=${initialDate}&end=${endDate}&currency=${currency}`);
			console.log(`data from ${initialDate} to ${endDate} in ${currency}`);
		} else {
			response = await axios.get(`${baseURL}?currency=${currency}`);
			console.log('data from last 31 days');
		}
		const values = Object.values(response.data.bpi);
		const dates = Object.keys(response.data.bpi);
		console.log('data:', response.data);

		let maxValue, minValue;
		printValues(maxValue, 'max', values, currency);
		printValues(minValue, 'min', values, currency);

		printChart(values, dates);
	} catch (error) {
		console.log(error);
	}
};

callApi();

// Implement functionalities
function handleChange(id) {
	document.getElementById(id).addEventListener('change', e => {
		e.target.name === 'currency'
			? (currencyInput = e.target.value)
			: e.target.name === 'initial-date' ? (initialDate = e.target.value) : (endDate = e.target.value);
		currencyInput === '' ? callApi(initialDate, endDate) : callApi(initialDate, endDate, currencyInput);
	});
}

function printValues(variable, id, apiValues, currency) {
	id === 'max' ? (variable = Math.max(...apiValues)) : (variable = Math.min(...apiValues));
	document.getElementById(id).textContent = `${variable} ${currency}`;
}

// Set up event listeners
handleChange('initial-date');
handleChange('last-date');
handleChange('currency');
