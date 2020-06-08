function callApi() {
    const currency = document.getElementById("currency").value;
    const initDate = document.getElementById("init").value;
    const finalDate = document.getElementById("final").value;
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json?currency=" +currency +"&start=" +initDate +"&end=" +finalDate)
      .then((res) => printChart(res.data, currency))
      .catch((err) => console.log(err));
  }
  function printChart(btcData, currency) {
    console.log(btcData);
    const btcDate = Object.keys(btcData.bpi);
    const btcPrice = Object.values(btcData.bpi);
    document.getElementById("max-value").innerHTML =
      Math.max(...btcPrice).toFixed(2) + " " + currency;
    document.getElementById("min-value").innerHTML =
      Math.min(...btcPrice).toFixed(2) + " " + currency;
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: btcDate,
        datasets: [
          {
            label: "Bitcoin Values (" + currency + ")",
            backgroundColor: "#D4AF37",
            borderColor: "red",
            data: btcPrice,
          },
        ],
      },
    });
  }
  window.onload(callApi());