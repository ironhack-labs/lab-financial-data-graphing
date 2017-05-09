/*jshint esversion:6 */
function updateData(start, end){
  if (typeof(start)==="string"&&typeof(end)==="string") {
    var string = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
  }else{
    var string = "http://api.coindesk.com/v1/bpi/historical/close.json";

  }
  $.ajax({
    url: string,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response.bpi);
      let labels = [];
      let data = [];
      labels = Object.keys(response.bpi);
      data = Object.values(response.bpi);
      console.log(labels, data);
      createChart(labels, data);
  },
  error: function (err) {
    console.log(err);
      },
  });
}

updateData();

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

$(document).ready(()=>{
  $('#character-form').submit((event) => {
    event.preventDefault();
    var init = document.getElementsByClassName("js-init-date")[0].value;
    var final = document.getElementsByClassName("js-final-date")[0].value;
    console.log(typeof(init));
    updateData(init, final);
  });
});
