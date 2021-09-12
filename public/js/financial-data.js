window.onload = () => {
	const url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
	axios.get(url).then((responseFromAPI) => {
		console.log(responseFromAPI.data);
	});
};
