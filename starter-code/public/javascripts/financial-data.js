const drawCharts = (dates, values) => {
  const ctx = document.getElementById("coindesk-chart").getContext("2d");

  new Chart(ctx, {
      type: "line",
      data: {
          labels: dates,
          datasets: [{
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              label: "CoinDesk Chart",
              data: values
          }]
      }
  });
};

const startChart = () => {
  axios
  .get("http://api.coindesk.com/v1/bpi/historical/close")
  .then(response => {
      const bpi = response.data.bpi;
      

      const dates = Object.keys(bpi);

      const values = Object.values(bpi);

     
      drawCharts(dates, values);
  });
};

startChart();

const filterData = (start, end) => {
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then(response => {
          const dates = Object.keys(response.data.bpi);
          const values = Object.values(response.data.bpi);

          drawCharts(dates, values);
  });
};

document.getElementById("start-date").onchange = () => {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;

  filterData(start, end);
};
document.getElementById("end-date").onchange = () => {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;

  filterData(start, end);
};