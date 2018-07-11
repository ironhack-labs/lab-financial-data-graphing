const api_url = "http://api.coindesk.com/v1/bpi/historical/close.json?start=2018-06-11&end=2018-07-07&currency=EUR";
let start = document.getElementById("start").value;
let end = document.getElementById("end").value;


  axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=EUR`)
  .then(res => printTheChart(res.data));

  let printTheChart = ((stockData) => {
    console.log(stockData);
    let stockLabels = Object.keys(stockData.bpi);
    let stockPrice = Object.values(stockData.bpi);
    console.log(stockLabels);
    console.log(stockPrice);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Stock Chart",
          borderColor: 'gray',
          backgroundColor: 'transparent',
          data: stockPrice,
        }]
      }
    });
   
  });


btn.addEventListener("click", () => {
    boolean = false;
    printTheChart();
   });


if (boolean) draw();