const bitcoinApi = new BitcoinApi(
  "http://api.coindesk.com/v1/bpi/historical/close.json"
);

let chart = null;

document.getElementById("display-chart").addEventListener("click", e => {
  // e.preventDefault()
  let startDate = document.getElementById("date-start").value;
  let endDate = document.getElementById("date-end").value;
  let currency = document.getElementById("currency").value;
  console.log(currency)
  console.log(endDate, startDate);

  if (startDate && endDate) {
    bitcoinApi.getData(startDate, endDate, currency).then(timeBetween => {
      let labels = [];
      let values = [];
      Object.keys(timeBetween.data.bpi).forEach(time => {
        values.push(timeBetween.data.bpi[time]); //me devuelve el valor del bitcoin
        labels.push(time); //me devuelve el valor de las fechas
      });
      console.log(values)
      document.getElementById("max-value").textContent= Math.max(...values);
      document.getElementById("min-value").textContent= Math.min(...values);
      console.log(Math.min(...values))
      printChart(labels, values);
    });
  }
});

const printChart = (labels, data) => {
  const mycanvas = document.getElementById("canvas");
  const ctx = mycanvas.getContext("2d");
  if (chart) {
    chart.clear();
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin/$",
          backgroundColor: "blue",
          data
        }
      ]
    }
    // options:{
    //   animation:{
    //     onProgress: function(animation){
    //       progress.value = animation.animationObject.currentStep/animation.animationObject.numSteps;
    //     }
    //   }
    // }
  });
};
