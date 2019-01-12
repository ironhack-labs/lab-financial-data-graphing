function updateGraph(startDate, endDate) {
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;
  axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start: startDate,
        end: endDate
      }
    })
    .then(response => {
      const dates = Object.keys(response.data.bpi);
      console.log("dates: " + dates);
      const values = Object.values(response.data.bpi);
      console.log("values: " + values);
      printTheChart(dates, values);
    })
    .catch(err => {
      console.error("Error API", err);
    });
}



updateGraph();

// Chart setup
const printTheChart = (dates, values) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Amount",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: values,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
};

startDate.onchange((e) => {
  // const startDate = e.target.value;
  const endDate = document.getElementById("end").value;
  updateGraph(e.target.value, endDate);
})
//  = printTheChart;
// endDate.onchange = printTheChart;
