document.querySelector("button").onclick = () => {
    const toDate = document.getElementById("to-date").value;
    const fromDate = document.getElementById("from-date").value;
    console.log(fromDate, toDate);
    getBitcoinData(fromDate, toDate);
}



const getBitcoinData = (fromDate, toDate) => {
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
        .then(response => {
            const dates = Object.keys(response.data.bpi);
            const prices = Object.values(response.data.bpi);
            console.log(dates);
            console.log(prices);
            drawCanvas(dates, prices);
        })
        .catch(err => {
            console.log(err);
        })
};

const drawCanvas = (labels, data) => {
    const ctx = document.getElementById("myChart").getContext("2d");
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            label: "Stocks chart",
            data: data
          }
        ]
      }
    });
  };

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

getBitcoinData("2019-01-01", today);