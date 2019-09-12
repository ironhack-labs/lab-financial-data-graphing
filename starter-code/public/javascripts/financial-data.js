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

//AXIOS REQUEST
const getDataRange = () => {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const currency = document.getElementById("currency").value;

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(response => {
      const labels = Object.keys(response.data.bpi);
      const values = Object.values(response.data.bpi);
      // console.log(labels);
      // console.log(values);
      drawChart(labels, values);
    });
};

document.getElementById("btn").onclick = getDataRange;
document.getElementById("currency").onchange = getDataRange;
getDataRange();
