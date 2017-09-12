function getDataInfo() {
  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json`,
    method: "GET",
    success: function(response) {
      const data = response;
      console.log(JSON.parse(data).bpi);
      var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
   data: {
        labels: Object.keys(JSON.parse(data).bpi),
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(JSON.parse(data).bpi),
        }]
    },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function createStartDate() {
  return ($("#start-date").val());
}

function createEndDate() {
  return ($("#end-date").val());
}

$("#chartButton").on("click", function() {
  getDataInfo();
});

$("#start-date").on("input", createStartDate );
$("#end-date").on("input", createEndDate);

