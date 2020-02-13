const callApi = async (initialDate, endDate, currency = 'USD') => {
	try {
		let response;
		if (initialDate && endDate) {
			response = await axios.get(
				`https://api.coindesk.com/v1/bpi/historical/close.json?start=${initialDate}&end=${endDate}&currency=${currency}`
			);
			console.log(`data from ${initialDate} to ${endDate} in ${currency}`);
		} else {
			response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`);
			console.log('data from last 31 days');
		}
		const values = Object.values(response.data.bpi);
		const dates = Object.keys(response.data.bpi);
		console.log('data:', response.data);
		const maxValue = Math.max(...values);
		const minValue = Math.min(...values);
		console.log('Maximum value:', maxValue);
		console.log('Minimum value:', minValue);
		document.getElementById('max').textContent = `${maxValue} ${currency}`;
		document.getElementById('min').textContent = `${minValue} ${currency}`;
		printChart(values, dates);
	} catch (error) {
		console.log(error);
	}
};
callApi();

let initialDate = document.getElementById('initial-date').value;
let endDate = document.getElementById('last-date').value;
let currencyInput = document.getElementById('currency').value;

function dateListener(id) {
	document.getElementById(id).addEventListener('change', e => {
		e.target.name === 'initial-date' ? (initialDate = e.target.value) : (endDate = e.target.value);
		currencyInput === '' ? callApi(initialDate, endDate) : callApi(initialDate, endDate, currencyInput);
	});
}

document.getElementById('currency').addEventListener('change', e => {
	currencyInput = e.target.value;
	console.log('currency changed to', e.target.value);
	callApi(initialDate, endDate, currencyInput);
});

// Set up event listeners
dateListener('initial-date');
dateListener('last-date');
