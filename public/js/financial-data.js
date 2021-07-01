

const printChart = coinData => {
	const dailyData = coinData.bpi;
	console.log(dailyData);
	// this is the data for the x axis
	const coinDates = Object.keys(dailyData);
	console.log(coinDates);
	// data for the y axis
	const coinPrices = coinDates.map(date => {
		return dailyData[date];
	});
	console.log(coinPrices);

	// the chart
	const ctx = document.querySelector('#myChart').getContext('2d');

	new Chart(ctx, {
		type: 'line',
		data: {
			// x - axis
			labels: coinDates,
			datasets: [
				{
					label: 'Bitcoin Value',
					backgroundColor: 'rgba(54, 162, 235, 1)',
					borderColor: 'rgba(255, 206, 86, 1)',
					// y - axis
					data: coinPrices
				}
			]
		}
	})
}

let startDate = document.getElementById('start');
document.addEventListener('change', dateValue);
	function dateValue(e) {
	  startDate = e.target.value;
	  console.log("checking event listener:", startDate)
	}

let endDate = document.getElementById('end');
document.addEventListener('change', dateValue);
	function dateValue(e) {
		endDate = e.target.value;
		console.log("checking event listener:", endDate)
	}
	
let coinUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`

axios.get(coinUrl)
	.then(response => {
		console.log(response.data);
		printChart(response.data)
	})
	.catch(err => {
		console.log(err);
	})

