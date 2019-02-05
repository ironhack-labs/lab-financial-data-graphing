function callApi(init,end){
  axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start="+init+"&end="+end)
  .then(dataCoin => {
    console.log(dataCoin.data.bpi);
    printTheChart(dataCoin.data.bpi);
  });
}

callApi("2019-01-05","2019-02-04")

const printTheChart = dataBpi => {
  const coinLabels = Object.keys(dataBpi);
  const coinPrice = Object.values(dataBpi);

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: coinLabels,
      datasets: [
        {
          label: "Coin-Value",
          data: coinPrice,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1
        }
      ]
    }
  });
};

window.onload = function(){
  document.getElementById("startdate").addEventListener("change", function(e){

    const startDate = document.getElementById("startdate").value
    const endDate = document.getElementById("enddate").value
    callApi(startDate,endDate)
  })

  document.getElementById("enddate").addEventListener("change", function(e){

    const startDate = document.getElementById("startdate").value
    const endDate = document.getElementById("enddate").value
    callApi(startDate,endDate)
  })
}
