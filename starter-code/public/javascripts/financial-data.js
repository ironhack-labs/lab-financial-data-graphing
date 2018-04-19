document.addEventListener('DOMContentLoaded', () => {

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

  let values;

  axios.get(api_url)
    .then(res => (values = res.data.bpi))
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
            backgroundColor: "rgb(96, 96, 96)",
            borderColor: "rgb(255, 0, 0)",
            data: stockPrice
          }
        ]
      }
    });
  };

  document.getElementById("update").addEventListener('click', () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

    axios.get(api_url)
      .then(res => (values = res.data.bpi))
      .then(closes => drawChart(closes));

  })


  console.log('IronGenerator JS imported successfully!');

}, false);

