// https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json
// https://api.coindesk.com/v1/bpi/currentprice.json
// https://api.coindesk.com/v1/bpi/historical/close.json?index=ILS&start=2013-09-01&end=2013-09-05
const coinDeskAPI = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json?'
});

const button = document.getElementById("generate-button")
const ctx = document.getElementById('canvas').getContext('2d');
const highestSpan = document.getElementById("highest-rate")
const lowestSpan = document.getElementById("lowest-rate")
button.onclick = () => {
    const startDate = document.getElementById("start-date").value
    const endDate = document.getElementById("end-date").value
    const currencyCode = document.getElementById("currency-code").value
    const searchStr = `currency=${currencyCode}&start=${startDate}&end=${endDate}`
	console.log('TCL: button.onclick -> searchStr', searchStr)
    
    coinDeskAPI.get(searchStr)
        .then(response => {
			console.log('TCL: button.onclick -> response', response)
            const dates = Object.keys(response.data.bpi)
            const rates = Object.values(response.data.bpi)
            const sort = rates.sort((a,b) => a-b)
            highestSpan.textContent = sort[sort.length-1]
            lowestSpan.textContent = sort[0]
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: "Stock Chart",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: rates,
                    }]
                }
            });
        })
        .catch(err => console.log(err))
};