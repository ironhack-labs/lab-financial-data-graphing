$(document).ready(() => {

//   class Price {
//     constructor(date, value) {
//       this.date = date;
//       this.value = value;
//     }
//   }
//
// const $priceIndex = $("#priceIndex");
// const addPrice = (price) => {
//
// };

const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2017-01-01";
function requestPriceIndexPromise () {
  return $.ajax({
    url: baseURL,
    dataType: 'json',
  }).then(data => {
    // let p = new Price (priceID, data.time.updated, data.bpi.USD.rate);
    console.log(data.bpi);
    // return p;
  }).catch(e => console.log(e));
}

// let pricePromises = [];
// for (var i = 1; i < 10; i++) {
//   pricePromises.push(requestPriceIndexPromise(i));
// }
// Promise.all(pricePromises).then(prices => {
//   console.log(prices);
//   prices.forEach(p => p ? addPrice(p): console.log("Error on price"));
// });

requestPriceIndexPromise();

});
