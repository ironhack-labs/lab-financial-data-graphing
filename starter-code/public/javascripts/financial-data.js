axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(response => {
    printTheChart(response.data.bpi);
  })
  .catch(error => {
    console.log(error);
  });


const printTheChart = (bitCoinData => {
  const bitCoinLabels = Object.entries(bitCoinData).map(element => element[0]);
  const bitCoinPrice = Object.entries(bitCoinData).map(element => element[1]);

  console.log("cijene su:", bitCoinPrice);
  const max = Math.max(...bitCoinPrice);
  const min = Math.min(...bitCoinPrice);
  const currencyHolder = document.getElementById("currency");
  const currency = currencyHolder.options[currencyHolder.selectedIndex].value;
  document.getElementById("max-price").innerHTML=`${max} ${currency}`;
  document.getElementById("min-price").innerHTML=`${min} ${currency}`;



  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitCoinLabels,
      datasets: [{
        label: "BitCoin Price Index",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: bitCoinPrice,
      }]
    }
  });
});

document.getElementById("submit-button").addEventListener('click', function () {

  commonFunction();

})


document.getElementById("currency").addEventListener('change', function () {

  commonFunction();

})


function commonFunction() {
  const startDate = document.getElementById('start').value;
  const endDate = document.getElementById('end').value;
  const currencyHolder = document.getElementById("currency");
  // console.log(currencyHolder);
  const currency = currencyHolder.options[currencyHolder.selectedIndex].value;
  // console.log(currency);
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
    .then(response => {
      console.log(response.data.bpi);
      printTheChart(response.data.bpi);
    })
    .catch(error => {
      console.log(error);
    });
}