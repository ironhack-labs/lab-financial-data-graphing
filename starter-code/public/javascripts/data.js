const restFinancialData = () => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => {
      console.log(res);
      const chartDates = Object.keys(res.data.bpi);
      const chartValues = Object.values(res.data.bpi);
      console.log("keys", chartDates, "value", chartValues);
      return myChart(chartDates, chartValues, "Title");
    })
    .catch(err => console.log("ERROR", err));
};

document.addEventListener("DOMContentLoaded", restFinancialData());
