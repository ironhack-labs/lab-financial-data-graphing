let datei = document.getElementById('datei')
datei.onchange = () => { getFinantialData() }
let datef = document.getElementById('datef')
datef.onchange = () => { getFinantialData() }


async function getFinantialData(){
    if (datei.value === '' || datef.value === ''){
		return 'Por favor seleccione una fecha'
	}
	if(datei.value > datef.value) {
		return err
    }

    await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${datei.value}&end=${datef.value}`)
    .then(responseFromAPI => {
        const prices = responseFromAPI.data.bpi

        const dateArray = Object.keys(prices)
        const priceArray = Object.values(prices)

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dateArray,
        datasets: [{
            label: 'CoinDesk Price Index',
            data: priceArray,
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
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
     });
        
    })
    
}

getFinantialData()