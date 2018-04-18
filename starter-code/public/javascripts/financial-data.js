const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(api_url)
  .then(res => res.data)
  .then(data => {
    const dates = Object.keys(data.bpi);
    const prices = Object.values(data.bpi);
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: prices
          }
        ]
      }
    });
  });
