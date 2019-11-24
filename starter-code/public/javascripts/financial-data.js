let start = '2016-12-01';
let end = '2017-06-02';

const getData = (startDate, endDate) => {
	const URL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
	axios
		.get(URL)
		.then((res) => {
			console.log(res);
			printTheChart(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const printTheChart = (stockData) => {
	const dailyData = stockData['bpi'];
	const stockDates = Object.keys(dailyData);
	const stockPrices = stockDates.map((date) => {
		return dailyData[date];
	});

	const ctx = document.getElementById('myChart').getContext('2d');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: stockDates,
			datasets: [
				{
					label: 'Bitcoin Price Index',
					backgroundColor: 'rgb(255,250,240)',
					borderColor: 'rgb(105,105,105)',
					data: stockPrices
				}
			]
		}
	});
};

getData(start, end);
const dateInicio = (document.getElementById('start').onchange = (e) => getData(start, e.target.value));
const dateFin = (document.getElementById('end').onchange = (e) => getData(start, e.target.value));
