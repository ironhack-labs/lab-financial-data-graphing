let start = document.getElementById("start").value;
let end = document.getElementById("end").value;
let btn = document.getElementById("btn");

const getData = (inDate, outDate) => {
  const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${inDate}&end=${outDate}&currency=EUR`;
  return axios.get(api_url).then(res => printTheChart(res.data));
}

let printTheChart = stockData => {
  console.log(stockData);
  let stockLabels = Object.keys(stockData.bpi);
  let stockPrice = Object.values(stockData.bpi);
  console.log(stockLabels);
  console.log(stockPrice);
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Chart",
          borderColor: "gray",
          backgroundColor: "transparent",
          data: stockPrice
        }
      ]
    }
  });
};
getData(start, end);

btn.addEventListener("click", () => {
  start = document.getElementById("start").value;
  end = document.getElementById("end").value;
  console.log(start, end);
  getData(start, end);
});
