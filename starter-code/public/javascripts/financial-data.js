
function setDate() {
  var urlChg = url + "?start=" + inicio.value + "&end=" + fin.value;
  fetch(urlChg)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      var output = [],
        item;

      for (var date in data.bpi) {
        item = {};
        item.date = date;
        item.number = data.bpi[date];
        output.push(item);
      }

      console.log(output);
      console.log(data.bpi);
      printTheChart(output);
    })
    .catch(err => console.log(err));
}

const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
var inicio = document.getElementById("inicio");
var fin = document.getElementById("fin");

inicio.addEventListener("change", () => {
  console.log(inicio.value);
  setDate();
});

fin.addEventListener("change", () => {
  console.log(fin.value);
  setDate();
});

let printTheChart = stockData => {
  let stockLabels = stockData.map(element => element.date);
  let stockPrice = stockData.map(element => element.number);
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
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

fetch(url)
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {

    var output = [],
      item;

    for (var date in data.bpi) {
      item = {};
      item.date = date;
      item.number = data.bpi[date];
      output.push(item);
    }

    console.log(output);
    console.log(data.bpi);
    printTheChart(output);
  })
  .catch(err => console.log(err));
