
//console.log(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${minVal}&end=${maxVal}`);

let ctx = document.getElementById('myChart').getContext('2d')
let datei = document.getElementById('datei')
datei.onchange = () => { getCurrencyInfo() }
let datef = document.getElementById('datef')
datef.onchange = () => { getCurrencyInfo() }


async function getCurrencyInfo() {
	if (datei.value === '' || datef.value === ''){
		return
	}
	if(datei.value > datef.value) {
		return err
	}

	const coinDeskApi = axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${datei.value}&end=${datef.value}`)
	
	await coinDeskApi
	.then(responseFromAPI => {
		const prices = responseFromAPI.data.bpi
		let arrDates = Object.keys(prices)
		let arrPrices = Object.values(prices)

		console.log(datei.value)
		let myChart = new Chart(ctx, {
			type: 'line',
			data: {
				 labels: arrDates,
				 datasets: [{
					  label: '# of Votes',
					  data: arrPrices,
					  backgroundColor: 'transparent',
					  borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
					  ],
					  borderWidth: 3
				 }]
			},
			options: {
				 scales: {
					  yAxes: [{
							ticks: {
								 beginAtZero: true
							}
					  }]
				 }
			}
	  })
	})

}


