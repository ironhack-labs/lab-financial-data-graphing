

$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "get",
  success: function (response) {
    var objeto = JSON.parse(response);
    Object.keys(objeto.bpi);
    console.log(objeto.bpi);
    var ctx = document.getElementById("myChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(objeto.bpi),
            datasets: [{
              label: "bpi",

              data: Object.values(objeto.bpi),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1

            }]

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  },
  error: function (err) {
    console.log(err);
  },
});
