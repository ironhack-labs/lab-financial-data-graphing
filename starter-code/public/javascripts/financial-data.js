$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  success: function (response) {
		var coinData = JSON.parse(response).bpi;
		console.log(coinData);
		var chartData = [];
		var chartLabels = [];
		var ctx = $("#myChart");

		for (var date in coinData) {
			chartData.push(coinData[date]);
			chartLabels.push(date);
		}

		console.log(chartData);

		var myLineChart = new Chart(ctx, {
	    type: 'line',
			data: {
				datasets: [{
					data: chartData,
					label: 'dataset1'
				}],
				labels: chartLabels
			}
		});

		console.log(myLineChart);

  },
  error: function (err) {
    console.log(err);
  },
})
