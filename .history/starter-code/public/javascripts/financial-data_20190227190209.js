

var count = 0;
var from,to;

function getChart(){

    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json",
        method: "GET",
        success: function (response) {    
            
            var dataFrom;
            var dataTo;
            var dataArray = [];
            var valueArray = [];               
            var ctx = document.getElementById("myChart");
            var bpi = JSON.parse(response).bpi; 

            for(var data in bpi){
                dataArray.push(data);
                valueArray.push(bpi[data]);
            }

            var myChart = new Chart(ctx, {        
                type: 'line',
                data: {
                    labels: dataArray,
                    datasets: [{
                        data: valueArray
                    }]
                }
            });
        },
        error: function (err) {
            console.log(err);
        },
    })

    dataArray = [];
    valueArray = [];
    
}

getChart();

$('#from-date').change(function(){
    from = $("#from-date").val();
    count++;
    if (count >= 2) getChartWithDates(from,to);
});

$('#to-date').change(function(){

    to = $("#to-date").val();
    count++;
    if (count >= 2) getChartWithDates(from,to);
});


function getChartWithDates(from,to){

    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json?start="+from+"&end="+to,
        method: "GET",
        success: function (response) {  
            
            console.log(response);
            var ctx = document.getElementById("myChart");
            var bpi = JSON.parse(response).bpi; 

            for(var data in bpi){
                dataArray.push(data);
                valueArray.push(bpi[data]);
            }

            var myChart = new Chart(ctx, {        
                type: 'line',
                data: {
                    labels: dataArray,
                    datasets: [{
                        data: valueArray
                    }]
                }
            });
            
        },
        error: function (err) {
            console.log(err);
        },
    }) 
    
    dataArray = [];
    valueArray = [];

    count = 0;

}
