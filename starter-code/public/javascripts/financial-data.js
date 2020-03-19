let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let $update = document.getElementById("update");
let $currency = document.getElementById("currency");


//EVENT LISTENER
$update.addEventListener("click", () => {

  let $fromDate = document.getElementById("from-date");
  let $toDate = document.getElementById("to-date");

  if ($fromDate.value >= $toDate.value) {
    let $error = document.getElementById("error");
    $error.innerText = `The end date can not be smaller than the start date`;
  }
  else {
    newApiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${$currency.value}&start=${$fromDate.value}&end=${$toDate.value}`;
    drawData(newApiUrl)
  }
});

//////
function drawData(url){
  axios
    .get(url)
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data.bpi);
    })
    .catch(err => {
      console.log("Error while getting the data: ", err);
    });
}

function printTheChart(data) {
  let $chart = document.getElementById("myChart").getContext("2d");

  let myChart = new Chart($chart, {
    type: "line",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Bitcoin Price Index",
          data: Object.values(data),
          backgroundColor: "rgba(52, 164, 239, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgb(31, 101, 147)",
          pointHoverBackgroundColor: "rgb(20, 19, 19)"
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: `currency ${currency.value}`
          }
        }]
      }     
    }
  }); 
} 

drawData(apiUrl)

