// $.ajax({
//   url: "http://api.coindesk.com/v1/bpi/historical/close.json",
//   method: "GET",
//   success: function (response) {
// 		var coinData = JSON.parse(response).bpi;
// 		console.log(coinData);
// 		var chartData = [];
// 		var chartLabels = [];
// 		var ctx = $("#myChart");
//
// 		for (var date in coinData) {
// 			chartData.push(coinData[date]);
// 			chartLabels.push(date);
// 		}
//
// 		console.log(chartData);
//
// 		var myLineChart = new Chart(ctx, {
// 	    type: 'line',
// 			data: {
// 				datasets: [{
// 					data: chartData,
// 					label: 'dataset1'
// 				}],
// 				labels: chartLabels
// 			}
// 		});
//
// 		console.log(myLineChart);
//
//   },
//   error: function (err) {
//     console.log(err);
//   },
// })

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();

$('.user-inputs').change(function() {
  delay(function(){
		var startDate = $("#start-date").val();
		var endDate 	= $("#end-date").val();
		var currency = $("#currency").val();
		var dateURL = "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency + "&start=" + startDate + "&end=" + endDate;

		console.log(dateURL);

		$.ajax({
		  url: dateURL,
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
  }, 1000 );
});
