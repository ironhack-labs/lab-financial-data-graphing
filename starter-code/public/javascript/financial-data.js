$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "http://api.coindesk.com/v1/bpi/historical/close.json",
        success: successCallback,
        error: errorCallback
    });
});

function successCallback(response) {
    var jsonObj = JSON.parse(response);
    var labels = Object.keys(jsonObj["bpi"]);
    var values = Object.values(jsonObj["bpi"]);

    //console.log(jsonObj["bpi"]);
    //console.log(labels);
    //console.log(values);
    var startSelect = $("#start-date");
    var endSelect = $("#end-date");

    console.log(endSelect);

    fillSelectOptions(startSelect, labels);
    fillSelectOptions(endSelect, labels);

    endSelect[0].selectedIndex = endSelect[0].childNodes.length - 1;

    createChart(labels, values);
}

function fillSelectOptions(selectorObj, values){
    values.forEach((element) => {
        selectorObj.append('<option value="' + element + '">' + element + '</option>');
    });
}

function errorCallback(error) {
    console.log(error);
}

function createChart(labels, values) {
    var ctx = $("#myChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            datasets: [{
                label: "Values",
                data:values
            }],
        },
        options: {
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Dates'
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 2000
                    }
                }]
            }
        }
    });
}
