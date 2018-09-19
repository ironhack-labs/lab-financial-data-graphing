const bitinfo = 'http://api.coindesk.com/v1/bpi/historical/close.json';

window.onload = function () {
  let form = document.getElementById("form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    newDate();
  });

  let newDate = () => {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let currency = document.getElementById("currency").value;
    axios.get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
    ).then(data => {
      printTheChart(data.data.bpi);
    })
  }

  axios.get(bitinfo).then(res => {
    printTheChart(res.data.bpi)
  })


  let printTheChart = (coinData) => {
    let coinLabels = Object.keys(coinData);
    let coinkPrice = Object.values(coinData);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinLabels,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinkPrice,
        }]
      }
    });
  }
}