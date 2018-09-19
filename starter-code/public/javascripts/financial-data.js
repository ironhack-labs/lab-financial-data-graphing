let chart;

const btcInfo  = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/',
});



// console.log(btcInfo)

let startDate = document.getElementById("start").value;
let endDate = document.getElementById("end").value;
let currency = document.getElementById("currency").value;

document.getElementById("start").addEventListener("change", () => {
  startDate = document.getElementById("start").value;
  console.log(startDate)
  callApi();
})

document.getElementById("end").addEventListener("change", () => {
  endDate = document.getElementById("end").value;
  console.log(endDate)
  callApi();
})

document.getElementById("currency").addEventListener("change", () => {
  currency = document.getElementById("currency").value;
  console.log(currency)
  callApi();
})

function callApi () {
btcInfo.get(`close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
  .then(function (response) {
  

let printTheChart = ((response) => {
  console.log(response)
  let ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(response.data.bpi),
      datasets: [{
        label: "BTC VALUE",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: Object.values(response.data.bpi),
        fill: false,
        pointRadius: 0,
      }]
    }
  });
  chart.update();
});
  printTheChart(response);

  // console.log(Math.max(...Object.values(response.data.bpi)));
  let largestNum = Math.max(...Object.values(response.data.bpi));
  let smallestNum = Math.min(...Object.values(response.data.bpi));
  document.getElementById('maxMin').innerHTML = `MAX VALUE: ${largestNum} </br> MIN VALUE: ${smallestNum}`;
})
}

callApi()
