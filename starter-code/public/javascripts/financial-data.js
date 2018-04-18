const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let values;
axios.get(api_url)
  .then(res => ( values = res.data.bpi))
  //.then(data => data.map(e => ({ date: e.date, close: e.close })))
  .then(closes => drawChart(closes));

  const drawChart = data => {
    console.log(values)
    let stockDate = Object.keys(values); // Eje X
    let stockPrice = Object.values(values); // Eje Y
  
    let ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockDate,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: stockPrice
          }
        ]
      }
    });
  };