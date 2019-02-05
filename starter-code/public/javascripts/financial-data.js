const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

let currency = document.getElementById("currency").value;
let startDate = document.getElementById("startDate").value;
let endDate = document.getElementById("endDate").value;

let query = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;

axios
  .get(query)
  .then(res => {
    var lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(res.data.bpi),
        datasets: [
          {
            label: "Stock chart",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: false,
            tension: 0,
            borderWidth: 1,
            pointHoverRadius: 20,
            borderColor: "rgba(255,99,132,1)",
            data: Object.values(res.data.bpi)
          }
        ]
      }
    });
  })
  .catch(error => console.log(error));

addListener = function(element) {
  document.getElementById(element).onchange = () => {
    currency = document.getElementById("currency").value;
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
    query = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`;
    console.log(query);
    axios
      .get(query)
      .then(res => {
        var lineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(res.data.bpi),
            datasets: [
              {
                label: "Stock chart",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
                tension: 0,
                borderWidth: 1,
                pointHoverRadius: 20,
                borderColor: "rgba(255,99,132,1)",
                data: Object.values(res.data.bpi)
              }
            ]
          }
        });
      })
      .catch(error => console.log(error));
  };
};

addListener("startDate");
addListener("endDate");
addListener("currency");
