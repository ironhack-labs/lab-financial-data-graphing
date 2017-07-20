$(document).ready(function(){
    $.ajax({
        url: "http://api.coindesk.com/v1/bpi/historical/close.json",
        method: "GET",
        success: function (response) {
            let newObject = JSON.parse(response);
            let dataX = Object.keys(newObject.bpi);
            let dataY = Object.values(newObject.bpi);
            var ctx = $('#myChart'); 
        
          
            var myLineChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels : dataX,
                                    datasets: [{
                                        data: dataY
                                    }]
                                },
                             });
                            
        },
        error: function (err) {
            console.log("error!");    
        },
    })

    $('.dates').on('submit', function(e){
        e.preventDefault();
        var initialDate = $('#ini').val();
        var endDate = $('#end').val();

         $.ajax({
            url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + initialDate + "&end=" + endDate,
            method: "GET",
            success: function (response) {
                let newObject = JSON.parse(response);
                let dataX = Object.keys(newObject.bpi);
                let dataY = Object.values(newObject.bpi);
                var ctx = $('#myChart'); 
            
            
                var myLineChart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels : dataX,
                                        datasets: [{
                                            data: dataY
                                        }]
                                    },
                                });
                                
            },
            error: function (err) {
                console.log("error!");    
            },
        })

    })

    $('.currency').on('submit', function(e){
        e.preventDefault();
        let currency = $(".currency option[type='text']:checked").val();
         $.ajax({
            url: "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency,
            method: "GET",
            success: function (response) {
                let newObject = JSON.parse(response);
                let dataX = Object.keys(newObject.bpi);
                let dataY = Object.values(newObject.bpi);
                var ctx = $('#myChart'); 
            
            
                var myLineChart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels : dataX,
                                        datasets: [{
                                            data: dataY
                                        }]
                                    },
                                });
                                
            },
            error: function (err) {
                console.log("error!");    
            },
        })

    })


})