const restFinancialData = axios.get("http://api.coindesk.com/v1/bpi/historical/close.json");

const getFinancialData = () => {
  restFinancialData.then(res => console.log(res)).catch(err => console.log("ERROR", err));
};

document.onload = getFinancialData();
