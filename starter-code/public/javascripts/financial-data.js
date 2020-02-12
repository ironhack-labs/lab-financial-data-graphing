const callApi = async () => {
	try {
		const response = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json');
		const values = Object.values(response.data.bpi);
		const dates = Object.keys(response.data.bpi);

		printChart(values, dates);
	} catch (error) {
		console.log(error);
	}
};

window.onload = callApi;
