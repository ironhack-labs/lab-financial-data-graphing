// function getCash(id) {
console.log("JJHV");
var myArrayOfDates = [];
var myArrayOfPrices = [];

var mySuperChart;


$.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function(response) {
        myArrayOfDates = [];
        myArrayOfPrices = [];
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
});


function filteredDatesChart(startDate, endDate) {

    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + startDate + "&end=" + endDate,
        method: "GET",
        success: function(response) {
            myArrayOfDates = [];
            myArrayOfPrices = [];

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
    });

}


$("#date1").change(function() {
    var startDate = ($("#date1").val());
    var endDate = ($("#date2").val());
    if (startDate.length > 1) {
        filteredDatesChart(startDate, endDate);
    }
});

$("#date2").change(function() {
    var startDate = ($("#date1").val());
    var endDate = ($("#date2").val());
    if (endDate.length > 1) {
        filteredDatesChart(startDate, endDate);
    }
});