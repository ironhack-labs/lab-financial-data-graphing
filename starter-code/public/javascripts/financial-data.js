var ctx = $("#myChart");
var test = [];


axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(function (response) {
        console.log("success!")

    })
    .catch(function (error) {
        console.log("error primoh")
    });


var info = $.getJSON('http://api.coindesk.com/v1/bpi/historical/close.json', function (data) {
    console.log(data);
    var datos = Object.entries(data)[0][1]
    console.log(Object.entries(datos)[1])

    

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(datos),
            datasets: [{
                label: 'Bit',
                data: Object.values(datos),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});