const url = "http://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2020-06-01&currency=USD";

axios
  .get(url)
  .then((response) => {
    const bitValue = response.data.bpi;
    const dates = Object.keys(bitValue); //obteniendo keys del objeto de la respuesta
    const prices = Object.values(bitValue); //obteniendo valores del objeto de la respuesta
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    document.getElementById("min").innerText = minPrice;
    document.getElementById("max").innerText = maxPrice;
    printTheChart(dates, prices);
  })
  .catch((err) => console.log(err));

function printTheChart(dates, prices) {
  const ctx = document.getElementById("my-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "transparent",
          borderColor: 'rgb(255, 99, 132)',
          data: prices
        },
      ],
    },
  });
}

const getValues = () => {
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;
  const currency = document.getElementById("currency").value;
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
  axios
    .get(apiUrl)
    .then((response) => {
      const bitcoinValue = response.data.bpi;
      const dates = Object.keys(bitcoinValue);
      const values = Object.values(bitcoinValue);
      const minPrice = Math.min(...values);
      const maxPrice = Math.max(...values);
      document.getElementById("min").innerText = minPrice;
      document.getElementById("max").innerText = maxPrice;
      printTheChart(dates, values);
    })
    .catch((err) => console.log(err));
};

document.getElementById("search").addEventListener("click", () => {
  getValues();
});
