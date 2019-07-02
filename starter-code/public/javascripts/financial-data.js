// document.querySelector("#getAPIInfo").onclick = function() {


// }
let labelsJson = []
let dataJson = []
axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json")
    // .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05")
    .then(JSONPayload => {
        for (let date in JSONPayload.data.bpi) {
            console.log("Property=" + date)
            labelsJson.push(date)
            dataJson.push(JSONPayload.data.bpi[date])
            console.log("valor de property = " + JSONPayload.data.bpi[date])
        }
    })

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelsJson,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: dataJson,
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
        }]
    },
    options: {
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero: true
        //         }
        //     }]
        // }
    }
});