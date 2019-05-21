
const start = document.getElementById("start")
const end = document.getElementById("end")
const currency = document.getElementById("currency")

start.onchange = () => {
  getDates(start.value, end.value, currency.value)
}
end.onchange = () => {
  getDates(start.value, end.value, currency.value)
}
currency.onchange = () => {
  getDates(start.value, end.value, currency.value)
}

const coinInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi',
});

const getDates = (start, end, currency) => {

  coinInfo.get(`/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
      console.log(response.data.bpi)
      printTheChart(response.data.bpi)
    })
    .catch(error => {
      console.log(error);
  });
}

const printTheChart = coinData => {
  console.log(coinData)
  const coinDate = Object.keys(coinData)
  const coinPrice = Object.values(coinData)
  const ctx = document.getElementById("chart").getContext("2d")
  new Chart(ctx, {
    type: "line",
    data: {
      labels: coinDate,
      datasets: [{
        data: coinPrice,
        label: "Precio",
        backgroundColor: "rgb(55, 132, 173)",
        borderColor: "rgb(55, 132, 173)"
      }]
    }
  })
}