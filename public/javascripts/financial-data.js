function getData(e) {
  var firstDate = document.getElementById("firstDate").value;
  var secondDate = document.getElementById("secondDate").value;
  var currency = document.getElementById("currency").value;

  var url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${firstDate}&end=${secondDate}`;

  axios
    .get(url)
    .then((response) => {
      var datas = Object.keys(response.data.bpi);
      var valores = Object.values(response.data.bpi);
        
      var min = Math.min(valores);
      var max = Math.max(valores);

      document.getElementById('max').innerHTML = `Maximo: ${max}`;
      document.getElementById('min').innerHTML = `Minimo: ${min}`;

      createChart(datas, valores);
    })
    .catch((err) => {
      console.log(err);
    });
}


function createChart(datas, valores) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: datas,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(145, 201, 45)",
          borderColor: "rgb(145, 201, 45)",
          data: valores,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}