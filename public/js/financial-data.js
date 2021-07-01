// const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`
// let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05`;
let fromDate = '2021-06-01';
let toDate = '2021-06-30';
let apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`;

let chart;

const printChart = bitcoinData => {
	const dailyData = bitcoinData.bpi;
	console.log(dailyData);
	// this is the data for the x axis
	const bitcoinDates = Object.keys(dailyData);
	console.log(bitcoinDates);
	// data for the y axis
	const bitcoinPrices = bitcoinDates.map(date => {
		return dailyData[date];
	});
	console.log(bitcoinPrices);

	// the chart
	const ctx = document.querySelector('#myChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

	chart = new Chart(ctx, {
		type: 'line',
		data: {
			// x - axis
			labels: bitcoinDates,
			datasets: [
				{
					label: 'Bitcoin Chart',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					// y - axis
					data: bitcoinPrices
				}
			]
		},
        // without the code below, the chart would never respect the original height of the canvas
        options: {
            maintainAspectRatio: false
        }
	})
}

axios.get(apiUrl)
	.then(response => {
		console.log(response.data);
		printChart(response.data)
	})
	.catch(err => {
		console.log(err);
	})

document.getElementById('fromDate').onchange = () => {
    fromDate = document.getElementById('fromDate').value;
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`;
    console.log('new fromDate: ' + fromDate);
    console.log('new apiUrl: ' + apiUrl);
    axios.get(apiUrl)
	.then(response => {
		console.log(response.data);
		printChart(response.data)
	})
	.catch(err => {
		console.log(err);
	})
}

document.getElementById('toDate').onchange = () => {
    toDate = document.getElementById('toDate').value;
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`;
    console.log('new toDate: ' + toDate);
    console.log('new apiUrl: ' + apiUrl);
    axios.get(apiUrl)
	.then(response => {
		console.log(response.data);
		printChart(response.data)
	})
	.catch(err => {
		console.log(err);
	})
}