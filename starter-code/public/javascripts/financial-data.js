let $chart = document.getElementById("myChart");
let fromDate = document.getElementById("from-date");
let toDate = document.getElementById("to-date");

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(apiResponse => {
    const dataBitcoin = apiResponse.data.bpi;
    console.log(dataBitcoin);

    let myChart = new Chart($chart, {
      type: "line",
      data: {
        labels: Object.keys(dataBitcoin),
        datasets: [{
            label: "Bitcoin Price Index",
            data: Object.values(dataBitcoin),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            pointBackgroundColor: "rgb(128, 128, 128)",
            pointHoverBackgroundColor: "rgb(20, 19, 19)",
          }
        ]
      }
    });
  });
