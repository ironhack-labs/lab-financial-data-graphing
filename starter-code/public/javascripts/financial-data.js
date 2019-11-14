const getBitcoinData = (dateFrom, dateTo) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`
    )
    .then(response => {
      console.log(response);
      const dates = Object.keys(response.data.bpi);
      const prices = Object.values(response.data.bpi);
      drawCanvas(dates, prices);
    })
    .catch(err => {
      console.log(err);
    });
};

const drawCanvas = (dates, prices) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          label: "Bitcoin chart",
          data: prices
        }
      ]
    }
  });
};

document.querySelector("button").onclick = () => {
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  getBitcoinData(dateFrom, dateTo);
};
