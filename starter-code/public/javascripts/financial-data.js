const callApi = async (initialDate, endDate) => {
	try {
		let response;
		if (initialDate && endDate) {
			response = await axios.get(
				`https://api.coindesk.com/v1/bpi/historical/close.json?start=${initialDate}&end=${endDate}`
			);
		} else {
			response = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`);
		}
		const values = Object.values(response.data.bpi);
		const dates = Object.keys(response.data.bpi);
		console.log(`data from ${initialDate} to ${endDate}`);
		printChart(values, dates);
	} catch (error) {
		console.log(error);
	}
};
callApi();

let initialDate = document.getElementById('initial-date').value;
let endDate = document.getElementById('last-date').value;

function dateListener(id) {
	document.getElementById(id).addEventListener('change', e => {
		e.target.name === 'initial-date' ? (initialDate = e.target.value) : (endDate = e.target.value);
		callApi(initialDate, endDate);
	});
}

// Set up event listeners
dateListener('initial-date');
dateListener('last-date');
