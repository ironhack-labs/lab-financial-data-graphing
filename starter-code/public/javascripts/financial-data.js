let bitcoinDays = [];
let bitcoinPrices = [];
let dayAndPrice = [];
let labels = [];
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(res => {
    
    let dateFormat = "YYYY-MM-DD";
    for(let key in res.data.bpi){
      let date = moment(key, dateFormat);
      
      labels.push(date._i);
      dayAndPrice.push({
        t: date.valueOf(),
        y: res.data.bpi[key]
      });
    }
    console.log(labels);

    var ctx = document.getElementById("myChart").getContext('2d');


		var cfg = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: 'BTC - Bitcoin Daily Price',
					data: dayAndPrice,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					xAxes: [{
            type: 'time',
            time: {
              parser: "YYYY-MM-DD",
              unit: 'day',
              unitStepSize: 1,
            },
						distribution: 'series',
						ticks: {
							source: 'labels'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Closing price ($)'
						}
					}]
				}
			}
		};
	

    var myChart = new Chart(ctx, cfg);

  })
  .catch(err => console.log('An error occurred: ', err));



