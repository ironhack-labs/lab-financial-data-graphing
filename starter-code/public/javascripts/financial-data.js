
$(()=> {
  getValues($("#start").val(),$("#end").val(),$("#currency").val());
})

function getValues(start,end,currency){
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then((response) => {
      var keys = Object.keys(response.data.bpi)
      var values = Object.values(response.data.bpi)
      myChart.data.labels = keys
      myChart.data.datasets[0].data = values
      var max = Math.max.apply(null, values);
      var min = Math.min.apply(null, values);
      $("#max").text(`Max:  ${max}`)
      $("#min").text(`Min: ${min}`)
      myChart.update();
    })
    .catch((err) => {
      if (err) console.log("Data could not be fetched")
    })
  }

  $("#start").change(()=>{
     getValues($("#start").val(),$("#end").val(),$("#currency").val());
  })

  $("#end").change(()=>{
     getValues($("#start").val(),$("#end").val(),$("#currency").val())
  })

  $("#currency").change(()=>{
     getValues($("#start").val(),$("#end").val(),$("#currency").val())
  })

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: [1,2,3],
      datasets: [{
          label: 'Bitcoin Index',
          data: [1,2,3], 
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {mode: 'point'},
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
})


