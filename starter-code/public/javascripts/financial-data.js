const start = document.getElementById("start");
const end = document.getElementById("end");
const currency = document.getElementById("currency");
const mini = document.getElementById("min");
const maxi = document.getElementById("max");
let currencyInput, startInput, endInput;

start.onchange = () => {
  bitcoinPriceTracker();
};

end.onchange = () => {
  bitcoinPriceTracker();
};

currency.onchange = () => {
  bitcoinPriceTracker();
};

const bitcoinPriceTracker = () => {
  startInput = start.value;
  endInput = end.value;
  currencyInput = currency.value;
  if (!startInput || !endInput) {
    begin();
  } else {
    updated();
  }
};

const begin = () => {
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => {
      console.log(response.data.bpi);
      // const dates
      const keys = Object.keys(response.data.bpi);
      const values = Object.values(response.data.bpi);
      console.log(values);

      minAndMax(values);
      drawChart(keys, values);
      //  console.log(labels);
    });
};

const minAndMax = val => {
  const small = Math.min(...val);
  const big = Math.max(...val);
  console.log(small, big);
  mini.innerText = `Minimum Value: ${small}`;
  max.innerText = `Maximum Value: ${big}`;
};

const updated = () => {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyInput}&start=${startInput}&end=${endInput}`
    )
    .then(response => {
      const keys = Object.keys(response.data.bpi);
      const values = Object.values(response.data.bpi);
      minAndMax(values);
      drawChart(keys, values);
      //
    });
};

const drawChart = (labels, values) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(255,88,132,0.2",
          label: "Bitcoin Price Index",
          data: values
        }
      ]
    }
  });
};

bitcoinPriceTracker();
