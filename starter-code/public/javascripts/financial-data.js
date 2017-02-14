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


var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var $input = $('.input-date');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

	//user is "finished typing," do something
function doneTyping () {
	setTimeout(function(){

		var startDate = $("#start-date").val();
		var endDate 	= $("#end-date").val();
		var dateURL = "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + startDate + "&end=" + endDate;

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
	},5000)
}
