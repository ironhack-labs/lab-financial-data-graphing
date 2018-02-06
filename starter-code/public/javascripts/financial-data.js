$(document).ready(() => {
    //consts / vars
    const baseUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
    let currency = $('.select-currency').val();
    //filter
    $('.filter-btn').click(() => {
        var dateIn = $('#dateA').val(); 
        var dateOut = $('#dateB').val(); 
        let filteredUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateIn}&end=${dateOut}`;
        getChart(filteredUrl);
        $('.reset-btn').show();
    });
    //reset
    $('.reset-btn').click(() => { 
        $('.reset-btn').hide();
        getChart(baseUrl);    
    });
    //select currency
    $(".select-currency").change(function() {
        currency = $(".select-currency").val();
        getChart(baseUrl+'?currency='+currency); 
    });
    //init chart
    getChart(baseUrl);
    //main function
    function getChart(req) {
        axios.get(req)
        .then(function (response) {
            //data
            let keys = Object.keys(response.data.bpi);
            let value = Object.values(response.data.bpi);
            let min = Math.min.apply(Math, value).toFixed(1);
            let max = Math.max.apply(Math, value).toFixed(1);
            //chart
            const ctx = document.getElementById("chart").getContext('2d');
            const chart1 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'Bitcoin price index',
                        data: value,
                        borderWidth: 1,
                        backgroundColor: 'rgba(64, 222, 241, 0.51)'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontFamily: "Roboto Mono",
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontFamily: "Roboto Mono",
                            }
                        }]
                    }
                }
            });
            $('.min-box span').text(min + ' '+currency);
            $('.max-box span').text(max + ' '+currency);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
});