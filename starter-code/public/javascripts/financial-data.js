// Global variables
const baseURL = 'https://api.coindesk.com/v1/bpi/historical/close.json?';
let initialDateInput = document.getElementById('initial-date').value;
let endDateInput = document.getElementById('last-date').value;
let currencyInput = document.getElementById('currency').value;

// Fetch API data
const callApi = async (initialDate, endDate, currency = 'USD') => {
	try {
		let response;
		if (initialDate && endDate) {
			response = await axios.get(`${baseURL}start=${initialDate}&end=${endDate}&currency=${currency}`);
			console.log(`data from ${initialDate} to ${endDate} in ${currency}`);
		} else if (!initialDate && !endDate) {
			response = await axios.get(`${baseURL}currency=${currency}`);
			console.log(`data from last 31 days`);
		} else {
			const fixEndDate = fixDate('end-date', initialDateInput);
			const fixInitialDate = fixDate('initial-date', endDateInput);
			response = await axios.get(
				`${baseURL}start=${initialDate || fixInitialDate}&end=${endDate || fixEndDate}&currency=${currency}`
			);
			console.log(`data from ${initialDate || fixInitialDate} to ${endDate || fixEndDate}`);
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
			: e.target.name === 'initial-date' ? (initialDateInput = e.target.value) : (endDateInput = e.target.value);
		currencyInput === ''
			? callApi(initialDateInput, endDateInput)
			: callApi(initialDateInput, endDateInput, currencyInput);
	});
}

function printValues(variable, id, apiValues, currency) {
	id === 'max' ? (variable = Math.max(...apiValues)) : (variable = Math.min(...apiValues));
	document.getElementById(id).textContent = `${variable} ${currency}`;
}

function fixDate(id, date) {
	return id === 'end-date'
		? moment(date).add(31, 'days').format('YYYY-MM-DD')
		: moment(date).subtract(31, 'days').format('YYYY-MM-DD');
}

// Set up event listeners
handleChange('initial-date');
handleChange('last-date');
handleChange('currency');
