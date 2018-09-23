const bitcoinApi = axios.create({
    baseUrl: "http://api.coindesk.com/v1/bpi/historical/close.json"
})

let startDate = "2016-09-12"
let endDate = "2018-09-12"
let currency = 'USD'

// axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
//     .then( response => {
//         console.log(Object.values(response.data.bpi), Object.keys(response.data.bpi))

//         let dataPrice = Object.values(response.data.bpi);
//         let dataDate = Object.keys(response.data.bpi)



//     })
//     .catch( error => {
//         console.log(error)
//     })


document.getElementById('start').onchange = function (e) {
    console.log(e);
    var start = e.target.value;
    draw(start, endDate, currency);
}

document.getElementById('end').onchange = function (e) {
    console.log(e)
    var end = e.target.value;
    draw(startDate, end, currency);
}

document.getElementById('currency').onchange = function (e) {
    console.log(e);
    var currency = e.target.value;
    draw(startDate, endDate, currency)
}


function draw(startDate, endDate, currency) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then(response => {
            console.log(Object.values(response.data.bpi), Object.keys(response.data.bpi))

            let dataPrice = Object.values(response.data.bpi);
            let maxPrice = Math.max(...dataPrice);
            console.log(maxPrice);
            let dataDate = Object.keys(response.data.bpi)
            let minPrice = Math.min(...dataPrice);
            console.log(minPrice);
            document.getElementById('max-price').innerHTML = maxPrice + ' ' + currency
            document.getElementById('min-price').innerHTML = minPrice + ' ' + currency

            var data = {
                type: 'bar',
                data: {
                    labels: Object.keys(response.data.bpi),
                    datasets: [{
                        label: "Bitcoin Price Evolution",
                        data: Object.values(response.data.bpi),
                        backgroundColor: "#F00",
                        borderColor: "#F00",
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        // text: 'Chart.js Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    // hover: {
                    // 	mode: 'nearest',
                    // 	intersect: true
                    // },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }

            }
            var ctx = document.getElementById('myChart').getContext('2d');
            let chart = new Chart(ctx, data);
        })
        .catch(error => {
            console.log(error)
        })
}


draw(startDate, endDate, currency)