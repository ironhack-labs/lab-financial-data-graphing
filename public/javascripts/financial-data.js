const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const currency = document.getElementById("currency");

const elementsArray = document.querySelectorAll("input");

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    printTheChart(response.data.bpi, currency.value);
  });

elementsArray.forEach((elem) => {
  elem.addEventListener("input", () => {
    console.log("Event listening");
    axios
      .get(
        "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" +
          currency.value +
          "&start=" +
          startDate.value +
          "&end=" +
          endDate.value
      )

      .then((response) => {
        console.log(response.data);
        printTheChart(response.data.bpi, currency.value);
      });
  });
});

function printTheChart(stockData, currency) {
  const date = Object.keys(stockData);
  const price = Object.values(stockData);

  const max = Math.max(...price);
  const min = Math.min(...price);

  const ctx = document.getElementById("my-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "BitCoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: price,
        },
      ],
    },
  }); // closes chart = new Chart()

  let str = `
        <h3>Values</h3>
         <div><b>Min: </b>${min} ${currency}</div>
         <div><b>Max: </b>${max} ${currency}</div>

   `;
  document.getElementsByClassName("container")[0].innerHTML = str;
} // closes printTheChart()
