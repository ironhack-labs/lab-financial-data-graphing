const bitcoinInfo = axios.create({
  baseURL: "/datos"
});

bitcoinInfo
  .get()
  .then((response) => {
    printTheChart2(response.data);
  })

  .catch((error) => {
    console.log(error);
  });

let printTheChart2 = ((stockData) => {
  let stockLabels = Object.keys(stockData);
  let stockPrice = Object.values(stockData);
  let ctx = document.getElementById("mycanvas").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: { 
      labels: stockLabels,
      datasets: [
        {
          label: "Bitcoin Chart",
          backgroundColor: "rgb(255,99,132)",
          borderColor: "rgb(255.99.132)",
          data: stockPrice
        }
      ]
    }
  });
});
