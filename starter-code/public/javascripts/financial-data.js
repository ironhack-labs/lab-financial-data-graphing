window.onload = function() {
  graphic("2018-12-01", "2018-12-31", "USD");
};

document.querySelector("#startDate").onchange = e => {
  let startDate = e.target.value;
  graphic(startDate, document.querySelector("#endDate").value,document.querySelector("#currency").value);
};

document.querySelector("#endDate").onchange = e => {
  let endDate = e.target.value;
  graphic(document.querySelector("#startDate").value, endDate, document.querySelector("#currency").value);
};
document.querySelector("#currency").onchange = e => {
  let currency = e.target.value;
  graphic(
    document.querySelector("#startDate").value,
    document.querySelector("#endDate").value,
    currency
  );
};

const graphic = (startDate, endDate, currency) => {
  const bitcoinApi = new BitcoinApi(
    `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
  );
  const xAxis = [];
  const yAxis = [];

  bitcoinApi.getDate().then(data => {
    Object.keys(data.data.bpi).forEach(dataBpi => {
      xAxis.push(dataBpi);
    });
    Object.values(data.data.bpi).forEach(dataBpi => {
      yAxis.push(dataBpi);
    });
    let minValue = Math.min.apply(null, yAxis);
    let maxValue = Math.max.apply(null, yAxis);

    document.querySelector("#valueMax").innerHTML = maxValue +" "+currency;
    document.querySelector("#valueMin").innerHTML = minValue +" "+currency;
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xAxis,
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: yAxis,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1
          }
        ]
      }
    });
  });
};
