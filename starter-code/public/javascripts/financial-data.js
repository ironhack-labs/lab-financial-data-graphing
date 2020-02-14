document.addEventListener("DOMContentLoaded", function() {
  //Get canvas ctx and create line chart
  const ctx = document.getElementById("chart").getContext("2d");
  const myLineChart = new Chart(ctx, {
    type: "line"
  });

  //Get and represent data from api
  const coinDeskApi = axios.create({
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
  });

  function getData() {
    coinDeskApi
      .get()
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
    getData();
  };
});
