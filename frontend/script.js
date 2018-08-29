$(document).ready(function () {
    let start = $("#start").val()
    let end = $("#end").val()
    let currency = "USD"

    $("#start").change(function () {
        start = $("#start").val()
        drawChart()
        //alert( "Handler for .change() called." );
    });


    $("#end").change(function () {
        end = $("#end").val()
        drawChart()
        //alert( "Handler for .change() called." );
    });


    $("select").change(function () {
        currency = $("select").val()
        drawChart()
        //alert( "Handler for .change() called." );
    });


    drawChart()

    function drawChart() {

        axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=" + start + "&end=" + end+"&currency="+currency).then(result => {

            let keys = Object.keys(result.data.bpi)
            let values = Object.values(result.data.bpi)




            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                        label: '# of Votes',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                }
            });


        })


    }



});

