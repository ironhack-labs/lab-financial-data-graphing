const ctx = document.getElementById('chart').getContext('2d');

const printChart = (values, dates) => {
	const lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
				{
					label: 'Bitcoin Price Index',
					data: values,
					backgroundColor: 'rgba(255, 179, 195, 0.3)',
					borderColor: 'rgb(255, 99, 132)'
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Bitcoin Price Index (BPI)'
			},
			elements: {
				line: {
					tension: 0.2,
					borderWidth: 1
				}
			}
		}
	});
};
