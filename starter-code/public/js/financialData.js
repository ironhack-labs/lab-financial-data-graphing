// function getCash(id) {
console.log("JJHV");
var myArrayOfDates = [];
var myArrayOfPrices = [];

var mySuperChart;
$.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json",
        method: "GET",
        success: function(response) {
            mySuperChart = JSON.parse(response).bpi;
            console.log(mySuperChart);
            var ctx = document.getElementById('myChart').getContext('2d');

            for (var date in mySuperChart) {
                console.log(mySuperChart[date])
                myArrayOfDates.push(date);
                myArrayOfPrices.push(mySuperChart[date]);
            }
            console.log(myArrayOfDates)

            var myNewChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        data: myArrayOfPrices,
                        label: "LABEL"
                    }],
                    labels: myArrayOfDates

                }

            });
        },
        error: function(err) {
            console.log(err);
        },
    })
    // }


// var mySuperChart = new myChart(ctx, {
//     type: 'line'
//         //data: response,
// });







// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         "bpi": {
//             "2017-06-11": 3018.545,
//             "2017-06-12": 2682.595,
//             "2017-06-13": 2738.9313,
//             "2017-06-14": 2494.485,
//             "2017-06-15": 2456.9238,
//             "2017-06-16": 2528.1025,
//             "2017-06-17": 2663.9975,
//             "2017-06-18": 2576.1713,
//             "2017-06-19": 2641.665,
//             "2017-06-20": 2778.8275,
//             "2017-06-21": 2712.1575,
//             "2017-06-22": 2740.79,
//             "2017-06-23": 2738.225,
//             "2017-06-24": 2619.1188,
//             "2017-06-25": 2594.4538,
//             "2017-06-26": 2485.3588,
//             "2017-06-27": 2593.17,
//             "2017-06-28": 2584.5638,
//             "2017-06-29": 2561.5613,
//             "2017-06-30": 2499.9838,
//             "2017-07-01": 2460.2,
//             "2017-07-02": 2529.7838,
//             "2017-07-03": 2581.0663,
//             "2017-07-04": 2625.0713,
//             "2017-07-05": 2629.2725,
//             "2017-07-06": 2619.1125,
//             "2017-07-07": 2521.2363,
//             "2017-07-08": 2579.9338,
//             "2017-07-09": 2525.675,
//             "2017-07-10": 2371.96,
//             "2017-07-11": 2332.1875
//         },
//         options: options
//     }
// });

// $("#moneybutt").on('click', function() {
//     getCash(1);
// })