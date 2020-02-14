document.addEventListener("DOMContentLoaded", function() {
  //Get canvas ctx and create line chart
  const ctx = document.getElementById("chart").getContext("2d");
  const myLineChart = new Chart(ctx, {
    type: "line"
  });

  //Get and represent data from api
  const coinDeskApiBaseUrl =
    "http://api.coindesk.com/v1/bpi/historical/close.json";

  function getData(url = coinDeskApiBaseUrl) {
    axios
      .get(url)
      .then(responseFromAPI => {
        let { bpi } = responseFromAPI.data;
        myLineChart.data.labels = Object.keys(bpi);
        myLineChart.data.datasets = [
          {
            label: "Bitcoin price index",
            data: Object.values(bpi)
          }
        ];
        myLineChart.update();
      })
      .catch(err => console.log("Error is: ", err));
  }

  getData();

  document.getElementById("refreshButton").onclick = function() {
    if (sDate.value.length != 0 && eDate.value.length != 0) {
      let url =
        coinDeskApiBaseUrl + "?start=" + sDate.value + "&end=" + eDate.value;
      getData(url);
    } else {
      getData();
    }
  };
});
