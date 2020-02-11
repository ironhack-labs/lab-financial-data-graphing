const getData = () => {
	const values = [];
	const dates = [];
	axios
		.get('https://api.coindesk.com/v1/bpi/historical/close.json')
		.then(response => {
			for (let key in response.data.bpi) {
				values.push(response.data.bpi[key]);
				dates.push(key);
			}
		})
		.catch(error => console.log(error));
	return { values, dates };
};
