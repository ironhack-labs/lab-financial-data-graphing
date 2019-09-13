const drawChart = (labels, data) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          label: "Stock",
          data: data
        }
      ]
    }
  });
};

let currency = "EUR"; /*,
  startDate = "",
  endDate = ""*/

const getDataForChartCurr = currency => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    )
    .then(response => {
      // create an array from values in the returned object
      const data = Object.values(response.data.bpi);
      const labels = Object.keys(response.data.bpi);
      drawChart(labels, data);
    });
};

getDataForChartCurr(currency);

const getDataForChartMulti = (startDate, endDate, currency) => {

  
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(response => {
      // create an array from values in the returned object
      const data = Object.values(response.data.bpi);
      const labels = Object.keys(response.data.bpi);
      drawChart(labels, data);
    });
};

// let startDate, endDate;

// let startDate = new Date().toISOString().slice(0, 10);
// let endDate = new Date().toISOString().slice(0, 10);

document.getElementById("startDate").onchange = () => {
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  if (startDate && endDate) {
    getDataForChartMulti(startDate, endDate, currency);
  }
};

document.getElementById("endDate").onchange = () => {
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  if (startDate && endDate) {
    getDataForChartMulti(startDate, endDate, currency);
  }
};

document.getElementById("currency").onchange = () => {
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  if (startDate && endDate) {
    currency = document.getElementById("currency").value;
    getDataForChartMulti(startDate, endDate, currency);
  } else {
    getDataForChartCurr(currency);
  }
};
