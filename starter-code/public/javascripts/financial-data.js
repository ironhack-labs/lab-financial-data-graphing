/*jshint esversion: 6 */
const restCoinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getCoinDeskInfo() {
  restCoinDeskApi
    .get()
    .then(responseFromAPI => printTheChart(responseFromAPI.data))
    .catch(err => console.log("Error is: ", err));
}

function printTheChart(data) {
  const bpi = data["bpi"];

  const xAxis = Object.keys(bpi); //get the keys
  console.log("EJE X " + xAxis);

  const yAxis = xAxis.map(e => bpi[e]); //get the values
  console.log("EJE Y " + yAxis);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: "Data",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: yAxis
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()

document.getElementById("theButton").onclick = function() {
  getCoinDeskInfo();
};
