/* ajax */
$(document).ready(function () {
    $(".input").change(function () {
       var startDate = $('#startTimestamp').val();
       var endDate = $('#endTimestamp').val();
    
        $.ajax({
            url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + startDate + "&end=" + endDate,
            method: "GET",
            success: function (result) {
                result = JSON.parse(result);
                var data = [];
                var dateRange = Object.keys(result.bpi);

                for (var date in result.bpi) {
                    data.push(result.bpi[date]);
                }

                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dateRange,
                        datasets: [{
                            label: '# of Votes',
                            data: data,
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
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            },
            error: function (err) {
                console.log(err);
            },
        });
    });
});


