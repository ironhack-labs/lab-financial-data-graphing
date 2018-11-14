let historicalUrl =
  " https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2018-09-05";

let graphLabel;
let graphBG;
let graphBorder = "rgba(95, 80, 226, 0.9)"; 
let cryptoLabels = "BitCoin price chart";
let cryptoPrice ="rgba(95, 80, 226, 0.212)";

//Canvas config
var ctx = document.getElementById("myChart").getContext("2d");

//API response function
function getBTCInfo() {
  const coinDeskApi = axios.create({
    baseURL: historicalUrl
  });

  coinDeskApi
    .get()
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI.data.bpi);
      printBTCChart(responseFromAPI.data.bpi);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}
getBTCInfo();

//Draw into chart API response
const printBTCChart = cryptoData => {
  cryptoLabels = Object.keys(cryptoData);
  cryptoPrice = Object.values(cryptoData);
  const chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: cryptoLabels,
      datasets: [
        {
          label: graphLabel,
          backgroundColor: graphBG,
          borderColor: graphBorder,
          data: cryptoPrice
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
};

document.getElementById("dateRange").onclick = function() {
  let dateFrom = document.getElementById("dateFrom").value;
  let dateTo = document.getElementById("dateTo").value;
  let currency = document.getElementById("currency").value;
  graphLabel = "BitCoin price chart";
  graphBG = "rgba(95, 80, 226, 0.212)";
  graphBorder = "rgba(95, 80, 226, 0.9)";
  console.log(currency);
  if (dateFrom === "" || dateTo === "") {
    getBTCInfo();
  } else if (dateFrom > dateTo) {
    graphLabel = "Invalid date";
    graphBG = "rgba(255, 80, 0, 0.212)";
    graphBorder = "rgba(255, 80, 0, 0.9)";
    printBTCChart({});
  } else {
    historicalUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;
    getBTCInfo();
  }
};
