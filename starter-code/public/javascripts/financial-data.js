const ctx = document.querySelector('#myChart').getContext('2d');
let chart = undefined;
var startDate = '2019-03-01';
var endDate = '2019-04-16';
var currency = `usd`;

document.querySelector("#dateStart").onchange = (e) => {
    startDate = e.target.value;

    draw();
};

document.querySelector("#dateEnd").onchange = (e) => {
    endDate = e.target.value;
    
    draw();
};

document.querySelector("#currency").onchange = (e) => {
    currency = e.target.value;

    draw();
};

draw();

function draw() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
      .then(bitcoinPrice => {
        bitcoinPrice = bitcoinPrice.data;
        const bitcoinDate = Object.keys(bitcoinPrice.bpi);
        const bitcoinValue = bitcoinDate.map(element => bitcoinPrice.bpi[element]);

        const minValue = Math.min.apply(null, bitcoinValue);
        const maxValue = Math.max.apply(null, bitcoinValue);

        document.querySelector('#minValue').innerHTML = minValue;
        document.querySelector('#maxValue').innerHTML = maxValue;

        if (chart)  chart.destroy()

        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: bitcoinDate,
            datasets: [{
              label: "Bitcoin Chart",
              borderWidth: 2,
              borderColor: 'rgb(255, 99, 132)',
              data: bitcoinValue,
            }]
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
