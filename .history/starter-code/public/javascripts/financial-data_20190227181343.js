// // const stockInfo  = axios.create({
// //   baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
// // });
// var stockLabels = [];
// var stockPrice = [];

// // const stock = "data";
// const getStockCoin = (start, end) => {
//   axios({
//     method: "get",
//     url: `http://api.coindesk.com/v1/bpi/historical/close.json` 
//   })
//   .then( response => {

//       var key = '';
//       var value = '';
//       for ( [key, value] of Object.entries(response.data.bpi)) {
//         stockLabels.push(key);
//         stockPrice.push(value);
//         // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
//       }
//       createCoinList(stockLabels, stockPrice );
//       printTheChart();
  
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

// // function getStockInfo(startDate, endDate) {
// // stockInfo.get()
// // .then( response => {
// //   // console.log(response);

// //   printTheChart(response.data);
// //     var key = '';
// //     var value = '';
// //     for ( [key, value] of Object.entries(response.data.bpi)) {
// //       stockLabels.push(key);
// //       stockPrice.push(value);
// //       // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
// //     }

// // })
// // .catch(error => {
// //   console.log(error);
// // });

// const createCoinList = (keyArray, valArray) => {
//   let htmlList = "";
//   for(let i = 0 ; i < keyArray.length; i ++) {
//       htmlList += `Date: ${keyArray[i]} | Price:${valArray[i]} `
//   }
//   document.getElementById("ul").innerHTML = htmlList;
// }


// var printTheChart = (stockData) => {
//   const ctx = document.getElementById('myChart').getContext('2d');


// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',
//     // The data for our dataset
//     data: {
//         labels: stockLabels,
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: stockPrice,
//         }]
//     }
// });
// };

// getStockCoin();


// document.getElementById("theButton").onclick = function(e){
//   e.preventDefault();
//   let start = document.getElementById("start").value;
//   let end = document.getElementById("end").value;
//   getStockCoin(start, end);
// }


let arrKeys = [] 
let arrValues = []

const getCoinData = (start, end) => {
    debugger
    axios({
      method: "get",
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}` 
    })
    .then(response => {
        debugger
    let data = response.data.bpi
    console.log(response.data.length);
    arrKeys = [] 
    arrValues = []
      for (i = 0; i < Object.keys(data).length; i++){
        arrKeys.push(Object.keys(data)[i]);
        arrValues.push(Object.values(data)[i]);
      }
      createCoinList(arrKeys, arrValues );
      createGraph();
    })
    .catch(err => {
      console.log(err);
    })
  }
  
const createCoinList = (keyArray, valArray) => {
    let htmlList = "";
    for(let i = 0 ; i < keyArray.length; i ++) {
        htmlList += `<li> ${keyArray[i]}: ${valArray[i]} </li>`
    }
    document.getElementById("ul").innerHTML = htmlList;
    debugger
}

const createGraph = () => {
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrKeys,
        datasets: [{
            label: 'historic price chart',
            data: arrValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
});
}

getCoinData();

const button = document.getElementById("button");

button.onclick = () => {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    getCoinData(start, end);
};