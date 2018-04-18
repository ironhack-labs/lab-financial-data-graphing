
const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let values;
axios
  .get(api_url)
  .then(res => values = res.data.bpi
  )

   .then(closes => drawChart(closes));

const drawChart = data => {
  console.log(values)

   let stockDate = Object.keys(values);
   let stockPrice = Object.values(values);
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDate,
      datasets: [
        {
          label: "Stock Chart",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrice
        }
      ]
    }
  });
};