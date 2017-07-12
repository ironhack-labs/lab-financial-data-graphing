$(document).ready(function () {

    // function renderChart(coinDeskInfo, startDate, endDate)
    // test api connection for iteration 1

    function renderChart(startDate, endDate, currency) {

        currency = currency || 'USD';

        let url = "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency;

        if (startDate && endDate) {
            
            url += '&start=' + startDate + '&end=' + endDate;
        }
 
        $.ajax({
            url: url,
            method: "GET",
            data: "",
            success: function (response) {
                //The callback function that will be executed if the request is completed succesfully
                //This function will have a parameter with the server response.

                console.log(response);

                const bpi = JSON.parse(response).bpi;

                var ctx = document.getElementById("myChart").getContext('2d');

                var values = [];

                Object.keys(bpi).forEach(key => {
                    values.push(bpi[key]);
                });

               console.log(values);

                const minVal = Math.min.apply(null, values);
                const maxVal = Math.max.apply(null, values);

                console.log('max', maxVal, 'min', minVal);

                $('.min-max').text('min: ' + minVal + ' - max: ' + maxVal);

                var chartOptions = {
                    type: 'line',
                    data: {
                        labels: Object.keys(bpi),
                        datasets: [
                            {
                                label: 'BPI in ' + currency,
                                data: values,
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'CoinDesk Bitcoin Price Index'
                        }
                    }
                }

                var myLineChart = new Chart(ctx, chartOptions);


            },
            error: function (err) {
                //The callback function that will be executed if the request fails, whether it was a client or a server error
                //It will have a parameter with error that caused the request to fail

                console.log(err);
                
            },
        })

    }

    // render with no start/end
    renderChart();

    $('#date-inputs').on('submit', function(event) {

        event.preventDefault();
        
        const startDate = $('input[name=start-date]').val();
        
        const endDate = $('input[name=end-date]').val();

        const currency = $('#currency').val();



        renderChart(startDate, endDate, currency);
    });

});