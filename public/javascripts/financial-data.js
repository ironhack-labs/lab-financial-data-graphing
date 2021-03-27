axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    console.log("response: ", response.data);
    // Y-axis will represent the bitcoin value
    const bitcoinData = response.data.bpi;
    const yAxis = Object.values(bitcoinData);
    //  X-axis will represent the date of each value
    const xAxis = Object.keys(bitcoinData);
    console.log(xAxis);

    drawChart(yAxis, xAxis);
  })

  .catch((error) => {
    console.log(error);
  });

function drawChart(yAxis, xAxis) {
  const ctx = document.getElementById("myChart");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: yAxis,
        },
      ],
    },
  });
}
