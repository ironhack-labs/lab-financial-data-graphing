const financialData  = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
  });
let start = "2016-09-12"
let end = "2018-09-12"
let ccy = 'USD'

document.getElementById('start').onchange = function(e) {
	console.log(e);
	start = e.target.value;
	getGraph(start,end,ccy)
}
document.getElementById('end').onchange = function(e) {
	console.log(e);
	end = e.target.value;
	getGraph(start,end,ccy)
}
document.getElementById('currency').onchange = function(e) {
	console.log(e);
	ccy = e.target.value;
	console.log(ccy);
	getGraph(start,end,ccy)
}


let getGraph=function(start,end,ccy) {
	console.log("hello client side")
	axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${ccy}`)
	.then(response	 => {
		console.log(Object.keys(response.data.bpi));
		let dataprice=Object.values(response.data.bpi);
		let maxPrice=Math.max(...dataprice);
		console.log(maxPrice);
		let minPrice=Math.min(...dataprice);
		console.log(minPrice);
		document.getElementById('max-price').innerHTML=maxPrice+' '+ccy
		document.getElementById('min-price').innerHTML=minPrice+' '+ccy
		var config = {
			type: 'line',
			data: {
				labels: Object.keys(response.data.bpi),
				datasets: [{
					label: 'BitCoin price evolution',
					backgroundColor: "#F00",
					borderColor: "#F00",
					data: Object.values(response.data.bpi),
					fill: false,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					// text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				// hover: {
				// 	mode: 'nearest',
				// 	intersect: true
				// },
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};
		var ctx = document.getElementById('myChart').getContext('2d');
		// window.myLine = new Chart(ctx, config);
		let chart = new Chart(ctx, config);

	})
}
getGraph(start,end,ccy)


