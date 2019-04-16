
let start = document.querySelector("#startDate");
let end = document.querySelector("#endDate");
let curr = document.querySelector("#currency");

document.querySelector("#btnDate").onclick = function () {
  draw();
};

document.querySelector("#currency").onchange = function () {
  draw();
}

var currencyColors = {
  USD: "rgba(0, 255, 0, 0.3)",
  EUR: "rgba(255, 255, 0, 0.3)"
}

function draw() {
  axios
    .get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${curr.value}&?start=${start.value}&end=${end.value}`)
    .then(bpiData => {
      bpiData = bpiData.data.bpi;

      const bpiLabels = [];
      const bpiPrices = [];

      for (var key in bpiData) {
        bpiLabels.push(key);
        bpiPrices.push(bpiData[key]);
      }
      // console.log(bpiLabels, typeof(bpiPrices[0]))

      const maxValue = Math.max.apply(null, bpiPrices);
      const minValue = Math.min.apply(null, bpiPrices);

      document.querySelector("#max").innerHTML = `Max: ${maxValue}`;
      document.querySelector("#min").innerHTML = `Min: ${minValue}`;

      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: bpiLabels,
          datasets: [{
            label: "BPI Chart",
            borderWidth: 2,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: currencyColors[curr.value],
            data: bpiPrices,
          }]
        }
      });
    });
}