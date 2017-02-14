/*jshint esversion:6 */
function updateData(){
$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  dataType: "json",
  success: function (response) {
    console.log(response.bpi);
    let labels = [];
    let data = [];
    labels = Object.keys(response.bpi);
    data = Object.values(response.bpi);
    createChart(labels, data);
},
  error: function (err) {
    console.log(err);
      },
  });
}
function createChart (labelsForChart, dataForChart){
  let data = {
    labels: labelsForChart,
    datasets: [{
      data: dataForChart,
    }]
};
  let ctx = document.getElementById("myChart");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
  });
}

updateData();
