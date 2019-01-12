const bitInfo = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const currency = document.getElementById("currency-select");
const maxPriceElement = document.getElementById("maxPrice");
const minPriceElement = document.getElementById("minPrice");


const printGraph = () => {
  bitInfo
    .get(``, {
      params: {
        start: startDate.value,
        end: endDate.value,
        currency: currency.value
      }
    })
    .then(response => {
      const dateLabels = Object.keys(response.data.bpi);
      const bitPrice = Object.values(response.data.bpi);
      const maxPrice = Math.max(parseFloat(Object.values(response.data.bpi)));
      const minPrice = Math.min(parseFloat(Object.values(response.data.bpi)));
      const ctx = document.getElementById("myChart").getContext("2d");
      console.log(Math.max(parseFloat(Object.values(response.data.bpi))));
      maxPriceElement.innerHTML = maxPrice;
      minPriceElement.innerHTML = minPrice;
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: currency.value,
              backgroundColor: "rgb(0,0,139)",
              borderColor: "rgb(0,0,139)",
              data: bitPrice
            }
          ]
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

printGraph();

startDate.onchange = () => {
  printGraph();
};

endDate.onchange = () => {
  printGraph();
};

currency.onchange = () => {
  printGraph();
};
