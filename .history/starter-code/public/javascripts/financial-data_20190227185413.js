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

//     printTheChart(response.data);
//       var key = '';
//       var value = '';
//       for ( [key, value] of Object.entries(response.data.bpi)) {
//         stockLabels.push(key);
//         stockPrice.push(value);
//         // $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
//       }
  
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


// document.getElementById("theButton").onclick = function(e){
//   e.preventDefault();
//   let start = document.getElementById("start").value;
//   let end = document.getElementById("end").value;
//   getStockCoin(start, end);
// }

var count = 0;
var from,to;

function getChart(){

    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json",
        method: "GET",
        success: function (response) {    
            
            var dataFrom;
            var dataTo;
            var dataArray = [];
            var valueArray = [];               
            var ctx = document.getElementById("myChart");
            var bpi = JSON.parse(response).bpi; 

            for(var data in bpi){
                dataArray.push(data);
                valueArray.push(bpi[data]);
            }

            var myChart = new Chart(ctx, {        
                type: 'line',
                data: {
                    labels: dataArray,
                    datasets: [{
                        data: valueArray
                    }]
                }
            });
        },
        error: function (err) {
            console.log(err);
        },
    })

    dataArray = [];
    valueArray = [];
    
}

getChart();

$('#from-date').change(function(){
    from = $("#from-date").val();
    count++;
    if (count >= 2) getChartWithDates(from,to);
});

$('#to-date').change(function(){

    to = $("#to-date").val();
    count++;
    if (count >= 2) getChartWithDates(from,to);
});


function getChartWithDates(from,to){

    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json?start="+from+"&end="+to,
        method: "GET",
        success: function (response) {  
            
            console.log(response);
            var ctx = document.getElementById("myChart");
            var bpi = JSON.parse(response).bpi; 

            for(var data in bpi){
                dataArray.push(data);
                valueArray.push(bpi[data]);
            }

            var myChart = new Chart(ctx, {        
                type: 'line',
                data: {
                    labels: dataArray,
                    datasets: [{
                        data: valueArray
                    }]
                }
            });
            
        },
        error: function (err) {
            console.log(err);
        },
    }) 
    
    dataArray = [];
    valueArray = [];

    count = 0;

}
