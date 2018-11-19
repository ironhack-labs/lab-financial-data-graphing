window.onload = function() {

  let allData;
  let dates;
  let values;
  let start;
  let end;
  let myChart;
  let currency;

  $("#set-date").click(function(){
    currency = $("#currency").val()
    start = $("#start-date").val()
    end = $("#end-date").val()
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`)
    .then((result)=>{
      allData = result.data.bpi;
      dates = Object.keys(allData)
      values = Object.values(allData)
      updateChart(dates, values)
      $("#max").html(`Max value: ${currency} `+Math.max.apply(Math, values))
      $("#min").html(`Min value: ${currency} `+Math.min.apply(Math, values))
    })
  })

  function updateChart(dates, values) {
    var ctx = $("#myChart")
    if(typeof myChart != "undefined") myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Value',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }]
        },
        options: {
          elements: {
            line: {
              tension: 0
            }
          },
          responsive:true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:false
              }
            }]
          }
      }
    });
  }

}

