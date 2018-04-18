const api_url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(api_url).then(res => {
  
  let keysBpi = Object.keys(res.data.bpi);
  let valuesBpi = Object.values(res.data.bpi);

  let ctx = document.getElementById("myChart").getContext("2d");

  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keysBpi,
      datasets: [
        {
          label: "Coin Value",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: valuesBpi
        }
      ]
    }
  });

});
    
