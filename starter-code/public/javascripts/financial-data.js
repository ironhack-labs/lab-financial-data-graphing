window.onload = function() {
  document.getElementById("getAPIData").onclick = function() {
    let initDate = document.querySelector("#dateI").value;
    let endDate = document.querySelector("#dateF").value;
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${initDate}&end=${endDate}`
      )
      .then(response => {
        actualizarChart(response);
      })
      .catch(errGetAPI => {
        console.log(errGetAPI);
      });
  };
};

function actualizarChart(objAPI) {
  let fechas = Object.keys(objAPI.data.bpi);
  let values = Object.values(objAPI.data.bpi);
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [
        {
          label: "Bitcoin Value",
          data: values,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        }
      ]
    }
  });
}
