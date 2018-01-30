$(document).ready(() => {
  var ctx = document.getElementById("myChart").getContext("2d");

  $("btn").click(function() {
    let inicio = $("#from").val();
    let final = $("#to").val();
    let moneda = $("#currency").val();

    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then(function(response) {
        let dates = Object.keys(response.data.bpi);
        let values = Object.values(response.data.bpi);
      });

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Bitcoin value",
            data: values,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255,99,132,1)"],
            borderWidth: 1
          }
        ]
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
    }).catch(function(error) {
      console.log("error");
    });
  });
});
