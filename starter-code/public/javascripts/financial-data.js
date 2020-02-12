// get request with Axios
function getCoinInfo(start = "2020-02-01", end = "2020-02-11") {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start,
        end
      }
    })
    .then(responseFromAPI => {
      let data = responseFromAPI.data;
      printTheChart(data);
    })
    .catch(e => console.log(e));
}

// print chart
function printTheChart(data) {
  Chart.defaults.global.defaultFontColor = "rgb(169, 169, 169)";
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
          backgroundColor: "rgba(30, 144, 255, 0.5)",
          borderColor: "rgb(30, 144, 255)",
          data: coinValues
        }
      ]
    }
  });
}

getCoinInfo();
