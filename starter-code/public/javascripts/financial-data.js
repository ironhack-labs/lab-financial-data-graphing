$(function() {
    $.ajax({
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2015-09-05',
        success: (chart) => {
            console.log(chart)
            let chartFormatter = $.parseJSON(chart)
            let ctx = $("#js-bitcoins");
            let bitcoinChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(chartFormatter.bpi),
                    datasets: [{
                        label: 'Bitcoin Value',
                        data: Object.values(chartFormatter.bpi),
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
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        },
        error: (err) => {
            console.log(err)
        }
    })
})