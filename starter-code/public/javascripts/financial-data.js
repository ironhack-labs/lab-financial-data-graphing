



document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("start").addEventListener("change", function() {
    updateChart();
  });
  
  document.getElementById("end").addEventListener("change", function() {
    updateChart();
  });

  updateChart();
});

const updateChart = () => {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    )
    .then(res => {
      data = res.data;
      console.log(data.bpi);
      printTheChart(data.bpi);
    });
};

const printTheChart = stockData => {
  const stockLabels = Object.keys(stockData);
  const stockPrice = Object.values(stockData);
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrice
        }
      ]
    }
  });
};
