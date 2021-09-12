window.onload = () => {
	// Historical dates
	// Line chart https://www.chartjs.org/docs/latest/
	const url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
	axios.get(url).then((responseFromAPI) => {
		console.log(responseFromAPI);
		//Get key
		const labels = Object.keys(responseFromAPI.data.bpi);
		const prices = labels.map((key) => responseFromAPI.data.bpi[key]);
		// console.log(prices);
		// console.log(Math.min(...prices));
		// console.log(Math.max(...prices));
		let minimumPrice = Math.min(...prices);
		let maximumPrice = Math.max(...prices);
		//Adding min max prices to input
		let minPrice = document.getElementById('minPrice');
		let maxPrice = document.getElementById('maxPrice');
		maxPrice.value = maximumPrice;
		minPrice.value = minimumPrice;

		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Prices of bitcoin price index',
						data: prices,
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
				responsive: true,
				//add this to read keys
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
	//SELECTING DATES
	const searchButton = document.getElementById('searchDates');
	searchButton.addEventListener('click', () => {
		const startingDate = document.getElementById('startingDate').value;
		const endingDate = document.getElementById('endingDate').value;
		//console.log(startingDate);
		//console.log(endingDate);
		const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}&currency=BTC`;
		console.log(url);
		axios.get(url).then((responseFromAPI) => {
			//console.log(responseFromAPI);
			const labels = Object.keys(responseFromAPI.data.bpi);
			const prices = labels.map((key) => responseFromAPI.data.bpi[key]);
			// console.log(prices);
			// console.log(Math.min(...prices));
			// console.log(Math.max(...prices));
			let minimumPrice = Math.min(...prices);
			let maximumPrice = Math.max(...prices);
			//Adding min max prices to input
			let minPrice = document.getElementById('minPrice');
			let maxPrice = document.getElementById('maxPrice');
			maxPrice.value = maximumPrice;
			minPrice.value = minimumPrice;
			const ctx = document.getElementById('myChart').getContext('2d');
			const myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Prices of bitcoin price index',
							data: prices,
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
					responsive: true,
					//add this to read keys
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
		});
	});
	//SELECTING CURRENCY
	const currencyButton = document.getElementById('currency');
	currencyButton.addEventListener('change', () => {
		console.log('We are here');
		const startingDate = document.getElementById('startingDate').value;
		const endingDate = document.getElementById('endingDate').value;
		const currency = document.getElementById('currency').value;

		let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}&currency=${currency}`;
		if (!startingDate && !endingDate) {
			url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
		} else {
			url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startingDate}&end=${endingDate}&currency=${currency}`;
		}

		console.log(url);
		axios.get(url).then((responseFromAPI) => {
			//console.log(responseFromAPI);
			const labels = Object.keys(responseFromAPI.data.bpi);
			const prices = labels.map((key) => responseFromAPI.data.bpi[key]);
			// console.log(prices);
			// console.log(Math.min(...prices));
			// console.log(Math.max(...prices));
			let minimumPrice = Math.min(...prices);
			let maximumPrice = Math.max(...prices);
			//Adding min max prices to input
			let minPrice = document.getElementById('minPrice');
			let maxPrice = document.getElementById('maxPrice');
			maxPrice.value = maximumPrice;
			minPrice.value = minimumPrice;

			const ctx = document.getElementById('myChart').getContext('2d');
			const myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: [ 'Prices of bitcoin price index' ],
							data: prices,
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
					title: {
						display: true,
						responsive: true,
						maintainAspectRatio: false,
						text: [ `Currency:${currency}` ]
					},
					responsive: true,
					//add this to read keys
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
		});
	});
};
