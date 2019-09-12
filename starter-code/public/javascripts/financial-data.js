//CHART
const drawChart = (labels, values) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          label: "Stock chart",
          data: values
        }
      ]
    }
  });
};
//INIT CHART
// drawChart();

//UPDATED DATES

//AXIOS REQUEST
const getDataRange = () => {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  // console.log(startDate, endDate);
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    )
    .then(response => {
      const labels = Object.keys(response.data.bpi);
      const values = Object.values(response.data.bpi);
      console.log(labels);
      console.log(values);
      drawChart(labels, values);
    });
};

document.getElementById("btn").onclick = getDataRange;
getDataRange();
