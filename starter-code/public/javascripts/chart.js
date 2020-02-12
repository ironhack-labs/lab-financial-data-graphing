const ctx = document.getElementById('chart').getContext('2d');

const printChart = (values, dates) => {
	const lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
				{
					label: 'BPI',
					data: values,
					backgroundColor: 'rgba(255, 179, 195, 0.3)',
					borderColor: 'rgb(255, 99, 132)',
					pointBackgroundColor: 'rgb(255, 99, 132)'
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Bitcoin Price Index (BPI)',
				fontSize: 22,
				fontColor: 'rgb(145, 33, 76)'
			},
			elements: {
				line: {
					tension: 0.2,
					borderWidth: 1
				}
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Bitcoin values',
							padding: { bottom: 7 },
							fontSize: 15,
							fontColor: 'rgb(145, 33, 76)',
							fontStyle: 'bold'
						}
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Times',
							padding: { top: 10 },
							fontSize: 15,
							fontColor: 'rgb(145, 33, 76)',
							fontStyle: 'bold'
						}
					}
				]
			}
		}
	});
};
