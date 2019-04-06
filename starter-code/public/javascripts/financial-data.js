const ctx = document.getElementById("chart").getContext("2d");
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');
const setFilters = document.getElementById('setFilters');
const currencyList = document.getElementById('currency');
const maxVal = document.getElementById('max');
const minVal = document.getElementById('min');

const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios.get(url).then(res => {
  console.log(
    `This are the keys retrieved from the API: ${Object.keys(res.data.bpi)}`
  );
  const bpiDate = Object.keys(res.data.bpi);
  const bpi = Object.values(res.data.bpi);
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: bpiDate,
      datasets: [
        {
          label: "BPI",
          backgroundColor: "rgba(236, 236, 236, 0.5)",
          borderColor: "rgb(200, 200, 200)",
          data: bpi
        }
      ]
    }
  });
  maxVal.innerHTML = `Max: ${Math.max.apply(null, bpi)}`;
  minVal.innerHTML = `Min: ${Math.min.apply(null, bpi)}`;
});

setFilters.addEventListener('click', () => {
  var from = dateFrom.value;
  var to = dateTo.value;
  var currency = currencyList.options[currencyList.selectedIndex].value;
  console.log(currency)
  var newUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&&currency=${currency}`
  axios.get(newUrl).then(res => {
    const bpiDate = Object.keys(res.data.bpi);
    const bpi = Object.values(res.data.bpi);
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDate,
        datasets: [
          {
            label: "BPI",
            backgroundColor: "rgba(236, 236, 236, 0.5)",
            borderColor: "rgb(200, 200, 200)",
            data: bpi
          }
        ]
      }
    });
    maxVal.innerHTML = `Max: ${Math.max.apply(null, bpi)}`;
    minVal.innerHTML = `Min: ${Math.min.apply(null, bpi)}`;
  });
})

