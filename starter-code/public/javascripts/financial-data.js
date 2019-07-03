const ctx = document.getElementById("myChart").getContext("2d");
const fromDate = document.querySelector("#fromDate")
const toDate = document.querySelector("#toDate")
const currency = document.querySelector('#currency')
const max = document.querySelector('#max')
const min = document.querySelector('#min')

fromDate.addEventListener("change", e => {
    console.log("FromDate changed: ", e.target.value);
    getBitcoinData();
});

toDate.addEventListener("change", e => {
    console.log("ToDate changed: ", e.target.value);
    getBitcoinData()
});

currency.addEventListener("change", e => {
    console.log("Currency changed: ", e.target.value);
    getBitcoinData()
});

let dt = new Date();
dt.setDate( dt.getDate() - 30 );

fromDate.value = dt.toISOString().slice(0, 10)
toDate.value = new Date().toISOString().slice(0, 10)
getBitcoinData()

function getBitcoinData() {

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}&currency=${currency.options[currency.selectedIndex].value}`)
    .then(({ data }) => {
        generateChart(Object.keys(data.bpi), Object.values(data.bpi));
        getValues(Object.values(data.bpi))
	});
}

function generateChart(labels, data) {
	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels,
			datasets: [
				{
					label: "Bitcoin Price Index",
					data
				}
			]
		},
		options: {
			responsive: false
		}
	});
}

function getValues(values){
    max.innerHTML = `${Math.max.apply(null, values).toFixed(2).toString()} ${currency.options[currency.selectedIndex].value}`
    min.innerHTML = `${Math.min.apply(null, values).toFixed(2).toString()}  ${currency.options[currency.selectedIndex].value}`
}
