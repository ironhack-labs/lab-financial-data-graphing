const drawChart = (labels, values) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(220,220,220,0.2)",
          label: "Bitcoin Price Index",
          data: values
        }
      ]
    }
  });
};

axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
    console.log(response);
    const labels = Object.keys(response.data.bpi);
    const values = Object.values(response.data.bpi);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    document.querySelector(".max").innerHTML = maxValue;
    document.querySelector(".min").innerHTML = minValue;
    document.querySelectorAll(".currency").innerHTML = document.querySelector(
      "select"
    ).value;
    drawChart(labels, values);
  });

const getData = (fromDate, toDate, currency) => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    )
    .then(response => {
      const labels = Object.keys(response.data.bpi);
      const values = Object.values(response.data.bpi);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      document.querySelector(".max").innerHTML = maxValue;
      document.querySelector(".min").innerHTML = minValue;
      document.querySelectorAll(".currency").innerHTML = document.querySelector(
        "select"
      ).value;
      drawChart(labels, values);
    });
};

document.getElementById("to-date").onchange = () => {
  let fromDate = document.getElementById("from-date").value;
  let toDate = document.getElementById("to-date").value;
  let currency = document.querySelector("select").value;

  getData(fromDate, toDate, currency);
};

document.querySelector("select").onchange = () => {
  let fromDate = document.getElementById("from-date").value;
  let toDate = document.getElementById("to-date").value;
  let currency = document.querySelector("select").value;
  getData(fromDate, toDate, currency);
};
