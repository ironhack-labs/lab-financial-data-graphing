// Global things needed
const endpoint = "http://api.coindesk.com/v1/bpi/historical/close.json";
let ctx = document.getElementById("myChart").getContext("2d");
const btn = document.getElementById("btn");

axios.get(endpoint).then(response => {
  const bpi = response.data.bpi;

  let myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(bpi),
      datasets: [
        {
          label: "BPI",
          data: Object.values(bpi)
        }
      ]
    }
    // options: options
  });
});

// ---
btn.onclick = () => {
  refreshChart();
};

// ---
const refreshChart = () => {
  const fromDateValue = document.getElementById("from-date").value;
  const toDateValue = document.getElementById("to-date").value;
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDateValue}&end=${toDateValue}`
    )
    .then(response => {
      const bpi = response.data.bpi;
      let myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(bpi),
          datasets: [
            {
              label: "BPI",
              data: Object.values(bpi)
            }
          ]
        }
      });
    });
};
