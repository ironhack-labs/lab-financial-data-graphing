document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-financial-data-graphing JS imported successfully!");
  },
  false
);

let myChart = null;
let currency = "USD"
let start = "2021-01-01"
let end = "2021-12-31"

function displayFinancialData(currency = "USD", start, end) {
  getFinancialData(currency, start, end)
    .then(({ bpi }) => {
      console.log("bpi: ", bpi)
      let labels = Object.keys(bpi);
      let financialData = Object.values(bpi);
      const data = {
        labels: labels,
        datasets: [{
          label: 'Bitcoin Price Index',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: financialData,
        }]
      };
      const config = {
        type: 'line',
        data: data,
        options: {}
      };
      if (myChart != null) {
        myChart.destroy();
      }
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    })
}

displayFinancialData(currency, start, end);

let startDateInput = document.getElementsByClassName('start-date');
startDateInput[0].addEventListener('change', (event) => {
  start = event.target.value;
  displayFinancialData(currency, start, end)
});

let endDateInput = document.getElementsByClassName('end-date');
endDateInput[0].addEventListener('change', (event) => {
  end = event.target.value;
  displayFinancialData(currency, start, end)
});







