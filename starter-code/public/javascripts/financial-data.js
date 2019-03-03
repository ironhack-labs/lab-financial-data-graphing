let dayAndPrice = [];
let labels = [];
let ctx = document.getElementById("myChart").getContext('2d');
let dateFormat = "YYYY-MM-DD";
let cfg, myChart;


function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}


const convertData = (data) => {
  for(let key in data){
      let date = moment(key, dateFormat);
      labels.push(date._i);
      dayAndPrice.push({
        t: date.valueOf(),
        y: data[key]
      });
    }
}

const configureChart = (timePriceArray, labelArray) => {
  cfg = {
			type: 'bar',
			data: {
				labels: labelArray,
				datasets: [{
					label: 'BTC - Bitcoin Daily Price',
          data: timePriceArray,
          backgroundColor: 'rgb(255,153,0)',
          borderColor: 'rgb(255,153,0)',
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
      },
      
			options: {
        maintainAspectRatio: false,
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
}


axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(res => {
    
    
    // for(let key in res.data.bpi){
    //   let date = moment(key, dateFormat);
      
    //   labels.push(date._i);
    //   dayAndPrice.push({
    //     t: date.valueOf(),
    //     y: res.data.bpi[key]
    //   });
    // }

    convertData(res.data.bpi);

    configureChart(dayAndPrice, labels);

    myChart = new Chart(ctx, cfg);

		// var cfg = {
		// 	type: 'bar',
		// 	data: {
		// 		labels: labels,
		// 		datasets: [{
		// 			label: 'BTC - Bitcoin Daily Price',
    //       data: dayAndPrice,
    //       backgroundColor: 'rgb(255,153,0)',
    //       borderColor: 'rgb(255,153,0)',
		// 			type: 'line',
		// 			pointRadius: 0,
		// 			fill: false,
		// 			lineTension: 0,
		// 			borderWidth: 2
		// 		}]
    //   },
      
		// 	options: {
    //     maintainAspectRatio: false,
		// 		scales: {
		// 			xAxes: [{
    //         type: 'time',
    //         time: {
    //           parser: "YYYY-MM-DD",
    //           unit: 'day',
    //           unitStepSize: 1,
    //         },
		// 				distribution: 'series',
		// 				ticks: {
		// 					source: 'labels'
		// 				}
		// 			}],
		// 			yAxes: [{
		// 				scaleLabel: {
		// 					display: true,
		// 					labelString: 'Closing price ($)'
		// 				}
		// 			}]
		// 		}
		// 	}
		// };
	

    // var myChart = new Chart(ctx, cfg);


    
  })
  .catch(err => console.log('An error occurred: ', err));


document.getElementById('filter').onsubmit = (e) => {
  e.preventDefault();
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then( res => {
      // removeData(myChart);
      myChart.destroy();
      dayAndPrice = [];
      labels = [];
      convertData(res.data.bpi);
      configureChart(dayAndPrice, labels);
      myChart = new Chart(ctx, cfg);
      // addData(myChart, dayAndPrice, labels);
    })
    .catch(err => console.log(err));
}

