const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getCoinInfo() {
  coinDeskApi
    .get()
    .then(responseFromAPI => {
      let data = responseFromAPI.data;
      printTheChart(data);
    })
    .catch(e => console.log(e));
}

getCoinInfo();

function printTheChart(data) {
  const dailyData = data["bpi"];

  const dates = Object.keys(dailyData);
  const coinValues = dates.map(date => dailyData[date]);

  const ctx = document.getElementById("coinChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          data: coinValues
        }
      ]
    }
  });
}
