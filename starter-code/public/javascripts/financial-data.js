document.querySelector("#applyDates").onclick = function() {
  var dateStart = document.querySelector("#dateStart").value;
  var dateEnd = document.querySelector("#dateEnd").value;
  var coint = document.getElementById("money").value;

  coint.onchange = function(e) {
    coint = e.target.value;
  };
  draw(dateStart, dateEnd, coint);
};

draw();

function draw(dateStart, dateEnd, coint) {
  /*    var newStart = []
    dateStart = dateStart.split("-")
    dateStart.forEach(element => {
        newStart.push(element)
    });
    newStart = newStart.join("-")
    console.log(newStart) */

  //http://api.coindesk.com/v1/bpi/historical/close.json?start=2010-08-10&end=2019-01-01

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${coint}`
    )
    .then(stockData => {
      stockData = stockData.data.bpi;

      var date = [];
      var amount = [];
      console.log(amount);

      for (let key in stockData) {
        date.push(key);
        amount.push(stockData[key]);
      }
      var maxValue = arr => Math.max(...arr);
    
      var minValue = arr => Math.min(...arr);

      document.getElementById("maxMin").innerHTML = `El maximo valor es: ${maxValue(amount)} y el mínimo es: ${minValue(amount)}`;
      
      //console.log(stockData);
      const stockLabels = date;
      // console.log(stockLabels);
      const stockPrice = amount;
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: stockLabels,
          datasets: [
            {
              label: "Stock Chart",
              borderWidth: 3,
              borderColor: "rgb(255, 99, 132)",
              //backgroundColor: companiesColors[ticket],
              data: stockPrice
            }
          ]
        }
      });
    });
}
