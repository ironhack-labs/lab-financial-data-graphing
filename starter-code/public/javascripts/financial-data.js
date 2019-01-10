document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
      console.log(response);
      let max = Math.max.apply(Math, Object.values(response.data.bpi));
      document.getElementById("max").innerHTML = max;
      printTheChart(response.data.bpi);
      // Here we can do something with the response object
    })
    .catch(err => {
      console.log(err); // Here we catch the error and display it
    });
});
let from = "2019-01-01";
let to = "2019-01-10";
document.getElementById("dateFrom").addEventListener("change", function(event) {
  console.log(event.target.value);
  from = event.target.value;
  let url = "http://api.coindesk.com/v1/bpi/historical/close.json?start=";
  url = url + from + "&end=" + to;
  console.log(url);
  axios
    .get(url)
    .then(response => {
      console.log(response);
      printTheChart(response.data.bpi);
      // Here we can do something with the response object
    })
    .catch(err => {
      console.log(err); // Here we catch the error and display it
    });
});

document.getElementById("dateTo").addEventListener("change", function(x) {
  console.log(x.target.value);
  to = x.target.value;
  let url = "http://api.coindesk.com/v1/bpi/historical/close.json?start=";
  url + from + "&end=" + to;
  axios
    .get(url)
    .then(response => {
      console.log(response);
      printTheChart(response.data.bpi);
      // Here we can do something with the response object
    })
    .catch(err => {
      console.log(err); // Here we catch the error and display it
    });
});
//axios.get shortcut für axios.request...

const printTheChart = stockData => {
  const stockLabels = Object.keys(stockData);
  const stockPrice = Object.values(stockData);
  console.log(stockPrice);
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Price",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrice
        }
      ]
    }
  });
};
