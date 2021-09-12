window.onload = () => {
	// Historical dates
	// Line chart https://www.chartjs.org/docs/latest/
	const url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
	axios.get(url).then((responseFromAPI) => {
		console.log(responseFromAPI);
		//Get key
		const labels = Object.keys(responseFromAPI.data.bpi);
		const prices = labels.map((label) => responseFromAPI.data.bpi[label]);
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
};
