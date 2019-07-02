

  PEPITO();

  function PEPITO() {
    let start = document.getElementById("startDate").value
    let end = document.getElementById("endDate").value
    axios
  .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  .then(JSONPayload => {
    console.log("Response from API is: ", JSONPayload.data.bpi);
     var axisX = Object.keys(JSONPayload.data.bpi)
    // var axisX = Object.keys(JSONPayload.data.bpi).filter(function(d, i) {
    //   // return d >= this.document.getElementsById(`startDate`) && d <= this.);
    //   return d >= 2019-06-03 && d <= 2019-07-01;
    // });
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: axisX,
        // labels: Object.keys(JSONPayload.data.bpi),
        datasets: [
          {
            label: "# financial data",
            data: Object.values(JSONPayload.data.bpi),
            backgroundColor: "#fabada",
            borderColor: "teal"
          }
        ]
      }
    });

    myChart.update();
  });
  }

