console.log(typeof inputFrom);

const restMoneyApi = axios.create({
  baseURL: ""
  // "http://api.coindesk.com/v1/bpi/historical/close.json?start=${inputFrom}&end=${inputTo}&currency=EUR"
});

function getMoneyInfo(from, to, currency) {
  restMoneyApi
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`
    )
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
        console.log("Response from API is: ", responseFromAPI.data);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//document.getElementById('theInput').onkeyup = () => {
document.getElementById("theButton").onclick = () => {
  const inputFrom = document.getElementById("from").value;
    const inputTo = document.getElementById("to").value;
     const currency = document.getElementById("currency-select").value;
    
  console.log(currency);
  getMoneyInfo(inputFrom, inputTo, currency);
};

function printTheChart(moneydatamoney) {
  const bpiData = moneydatamoney["bpi"];
  const stockMoney = Object.keys(bpiData);
    const stock = stockMoney.map(elm => bpiData[elm]);
    let max = Math.max(...stock)
    let min = Math.min(...stock)
    document.getElementById("valorMax").innerText = max;
    document.getElementById("valorMin").innerText = min;


  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: stockMoney,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stock
        }
      ]
    }
  });
}
