getValues()

$( "#start-date" ).change(function(){
    getValues();
});

$( "#end-date" ).change(function(){
    getValues();
});

$( "#currency" ).change(function(){
    getValues();
    $(".currency").text(" " + $('#currency').val());
});

function getValues() {
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    var currency = $('#currency').val();

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(function (response) {
        displayValues(response);
        updateMinMax(Object.values(response.data.bpi));
    }).catch(function (error) {
        console.log(error);
    });
}

function displayValues(response) {
    var dataArray = Object.values(response.data.bpi);
    var labelsArray = Object.keys(response.data.bpi);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labelsArray,
        datasets: [{
            label: "Bitcoin price index",
            backgroundColor: 'rgb(233, 233, 233)',
            borderColor: 'rgb(203, 203, 203)',
            data: dataArray,
        }]
    },
    // Configuration options go here
    options: {}
});
}

function updateMinMax(values) {
    $("#min-value").html(" " + Math.min(...values));
    $("#max-value").html(" " + Math.max(...values));   
}