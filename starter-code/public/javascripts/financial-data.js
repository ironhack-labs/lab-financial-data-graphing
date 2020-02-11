const getData = async () => {
	try {
		const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
		console.log(response.data);
		const bpi = response.data.bpi.USD.rate_float;
		document.getElementById('value').innerText = bpi;
	} catch (error) {
		console.log(error);
	}
};

getData();
