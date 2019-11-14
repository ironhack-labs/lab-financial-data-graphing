document.querySelector("button").onclick = () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const currency = document.getElementById("currency").value;
  console.log(currency);
  getFinancialData(startDate, endDate, currency);
};

const getFinancialData = (startDate, endDate, value) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${value}`
    )
    .then(res => {
      const dates = Object.keys(res.data.bpi).map(el => {
        return el;
      });
      console.log("dates: " + dates);
      const closes = Object.values(res.data.bpi).map(el => {
        return el;
      });
      document.getElementById("minVal").innerText = Math.min(
        ...closes
      ).toString();
      document.getElementById("maxVal").innerText = Math.min(
        ...closes
      ).toString();
      const maxVal = Math.max(...closes);
      drawCanvas(dates, closes);
    })
    .catch(err => {
      console.log(err);
    });
};

const drawCanvas = (labels, data) => {
  //   console.log(labels + ":" + data);
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data
        }
      ]
    }
  });
};
