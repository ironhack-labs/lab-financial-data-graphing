window.onload = function() {
  document.getElementById(
    "myButton"
  ).onclick = function makeCountryAJAXRequest() {
    axios
      .get("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then(response => {
        updateChart(response);
      });
  };

  function updateChart(response) {
    const bpiDate = Object.keys(response.data.bpi);
    const bpiValue = Object.values(response.data.bpi);

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDate,
        datasets: [
          {
            label: "# of Votes",
            data: bpiValue,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255,99,132,1)"],
            borderWidth: 1
          }
        ]
      }
    });
  }
};
