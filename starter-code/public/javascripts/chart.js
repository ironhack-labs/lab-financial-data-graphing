const ctx = document.getElementById('chart').getContext('2d');

// console.log('connected');
const { values, dates } = getData();

const prinChart = () => {
	const lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
				{
					label: 'Bitcoin Price Index',
					data: values
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Custom Chart Title'
			}
		}
	});
};
