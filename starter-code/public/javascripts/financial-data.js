var ctx = $("#myChart");

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(function (response) {
        console.log("success!")
    })
    .catch(function (error) {
        console.log("error primoh")
    });


$.getJSON('http://api.coindesk.com/v1/bpi/historical/close.json', function (data) {
    var datos = data.bpi

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
            elements: {
                line: {
                    tension: 0.3, // disables bezier curves
                }
            }
        }
    });
});