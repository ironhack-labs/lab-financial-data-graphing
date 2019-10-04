const ctx = document.getElementById("chart");
const startDate = document.getElementById("from");
const endDate = document.getElementById("to");
const currency = document.getElementById("currency");
const maxPrice = document.getElementById("max");
const minPrice = document.getElementById("min");
let query = "";

const apiEndpoints = {
  default: "https://api.coindesk.com/v1/bpi/historical/close.json",
  date: "",
  currency: "",
};

let getURL = `${apiEndpoints.default}${apiEndpoints.currency}${apiEndpoints.date}`;

const getBitcoinPriceIndex = (url = "https://api.coindesk.com/v1/bpi/historical/close.json" ) => {
  
  axios.get(url)
  .then( res => {
    const { bpi } = res.data;
    printChart(bpi);
    getMaxMin(bpi);
  })
  .catch(err => console.log("Error while getting the data: ", err));

}

const printChart = (bpiData) => {

  const dates = Object.keys(bpiData);
  const prices = dates.map( date => bpiData[date] );

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(55, 55, 141)",
          borderColor: "rgb(43, 43, 105)",
          data: prices
        }
      ]
    }
  });

}

const getMaxMin = (bpiData) => {

  const dates = Object.keys(bpiData);
  const prices = dates.map( date => bpiData[date] );

  maxPrice.innerText = `Max: $${Math.max.apply(null, prices)}`;
  minPrice.innerText = `Min: $${Math.min.apply(null, prices)}`;

  console.log(prices);
}

getBitcoinPriceIndex();

const getDataWithRange = () => {
  if (startDate.value && endDate.value) {
    apiEndpoints.date = `?start=${startDate.value}&end=${endDate.value}`;
    getURL = `${apiEndpoints.default}${apiEndpoints.date}&&${apiEndpoints.currency}`;
    getBitcoinPriceIndex(getURL);
  }
  else console.log(false);
}

const getDataWithCurrency = () => {
  if (currency.value) {
    apiEndpoints.currency = `?currency=${currency.value}`;
    getURL = `${apiEndpoints.default}${apiEndpoints.date}&&${apiEndpoints.currency}`;
    console.log(`Requesting currency: ${apiEndpoints.currency}`);
    getBitcoinPriceIndex(getURL);
  }
  else console.log(false);
}

startDate.onchange = () => getDataWithRange();
endDate.onchange = () => getDataWithRange();

currency.onchange = () => getDataWithCurrency();

console.log(getURL);