const btcInfo  = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/',
});

console.log(btcInfo);

let startDate = "2010-07-19";
let endDate = "2018-09-18";
let currency = "GBP";

btcInfo.get(`close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
});