const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});
function getHistorialInfo() {
  coinDeskApi
    .get()
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log("Error is: ", err));
}
getHistorialInfo();

function printTheChart(data) {
  const dailyData = data["bpi"];

  const dates = Object.keys(dailyData);
  const coin = dates.map(date => dailyData[date]);

  const ctx = document.getElementById("historialChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Prices",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: coin
        }
      ]
    }
  });
}
function getFilter() {
  let fromValue = document.getElementById("from").value;
  let toValue = document.getElementById("to").value;
  let currencyValue = document.getElementById("currency").value;

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromValue}&end=${toValue}&currency=${currencyValue}`
    )
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log("Error while getting the data: ", err));
}
