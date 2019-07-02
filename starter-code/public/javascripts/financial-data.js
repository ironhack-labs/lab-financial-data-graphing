let dataX = [];
let labelsY = [];

axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(bitcoinData => {

    
    for (var date in bitcoinData.data.bpi) {
      dataX.push(bitcoinData.data.bpi[date]);
      labelsY.push(date);
    }
  });

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",
  // The data for our dataset
  data: {
    labels: labelsY,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataX
      }
    ]
  },
  // Configuration options go here
  options: {}
});

let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");

startDate.valueAsDate = new Date();
endDate.valueAsDate = new Date();

startDate.onchange = function() {
//   console.log(this.value);
  test();
};
endDate.onchange = function() {
//   console.log(this.value);
  test();
};

function test() {
//   dataX.length=0;
//   labelsY.length=0;
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${
        startDate.value
      }&end=${endDate.value}`
    )
    .then(bitcoinData => {
      for (var date in bitcoinData.data.bpi) {
        dataX.push(bitcoinData.data.bpi[date]);
        labelsY.push(date);
      }
    });
    chart.update();
    debugger
}
ctx.clearRect(0,0,4000,4000)

