let API_URL = "http://api.coindesk.com/v1/bpi/historical/close.json"
let start = ""
let end = ""

const printTheChart = (stockData) => {
	console.log(stockData)
	const stockDates = Object.keys(stockData)
	const stockPrices = stockDates.map((val) => stockData[val])

	const ctx = document.getElementById("myChart").getContext("2d")
	new Chart(ctx, {
		type: "line",
		data: {
			labels: stockDates,
			datasets: [
				{
					label: "Stock Chart",
					backgroundColor: "rgb(255, 99, 132)",
					borderColor: "rgb(255, 99, 132)",
					data: stockPrices,
				},
			],
		},
	})
}

function handler(e) {
	console.log(e.target.name)
	if (e.target.name === "start-date") {
		start = e.target.value
	} else {
		end = e.target.value
	}

	if (start !== "" && end !== "") {
		API_URL += `?start=${start}&end=${end}`
		updateAxiosRequest(API_URL)
		console.log(API_URL)
	}
}

function updateAxiosRequest(apiURL) {
	axios
		.get(apiURL)
		.then((response) => {
			printTheChart(response.data.bpi)
		})
		.catch((err) => {
			console.log("Error while getting the data", err)
		})
}

axios
	.get(API_URL)
	.then((response) => {
		printTheChart(response.data.bpi)
	})
	.catch((err) => {
		console.log("Error while getting the data", err)
	})
