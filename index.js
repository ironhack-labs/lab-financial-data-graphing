window.onload = () => {

  let firstDate = document.getElementById("first-date").value;
  let seconDate = document.getElementById("second-date").value;
  
  document.getElementById("update").addEventListener("click",()=> {
    firstDate = document.getElementById("first-date").value
    seconDate = document.getElementById("second-date").value

    console.log(firstDate, seconDate)
    start();
  })

  
  
  const start = () => {
    let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate}&end=${seconDate}`;
  
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

})
}
    

start();
}