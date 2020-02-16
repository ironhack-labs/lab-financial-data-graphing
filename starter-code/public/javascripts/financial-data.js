const baseUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;

const getCoinDeskInfo = (firstDate, secondDate) => {
  axios
    .get(`${baseUrl}?start=${firstDate}&end=${secondDate}`)
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI);
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log("Error is: ", err));
}

const printTheChart = stockData => {
  const dailyData = stockData["bpi"];
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]);
  const ctx = document.getElementById("myChart").getContext("2d");

  const sortedArray = stockPrices.sort((a,b) => a-b);
  const max = sortedArray[sortedArray.length-1];
  const min = sortedArray[0];
  document.getElementById('max').innerHTML = `Max: ${max}`;
  document.getElementById('min').innerHTML = `Min: ${min}`;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Bitcoin prices",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  });
}

document.getElementById("second-date").onchange = function() {
  let firstDate = document.getElementById("first-date").value;
  let secondDate = document.getElementById("second-date").value; 
  getCoinDeskInfo(firstDate, secondDate);
};
