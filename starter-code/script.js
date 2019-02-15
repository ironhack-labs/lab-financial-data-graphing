iterate();

$(document).ready(function () {
    $("input, select").change(function () {
        iterate();
        
    });
});

function iterate() {
    let initialDate = $("#initial-date").prop("value");
    let lastDate = $("#last-date").prop("value");
    let currency = $("#currency").prop("value");
    
    if(initialDate == "" || lastDate == ""){
        var dates = "";
    }
    else{
        var dates = "&start=" + initialDate + "&end=" + lastDate;
    }

    const coinDeskApi = axios.create({
        baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json?" + "currency=" + currency + dates
        
    });

    coinDeskApi.get()
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data.bpi);
           
        })
        .catch(err => {
            console.log('Error is: ', err);
        })
    function printTheChart(values) {
        const coinPrices = Object.values(values);
        const maxPrice = Math.max.apply(null, coinPrices).toFixed(2);
        const minPrice = Math.min.apply(null, coinPrices).toFixed(2);
        
        const coinLabels = Object.keys(values);
        $("#max").empty();
        $("#max").append("Max: " + maxPrice + " " + currency);
        
        $("#min").empty();
        $("#min").append("Min: " + minPrice + " " + currency);
        
       
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: coinLabels,
                datasets: [{
                    label: "BitCoin Price Index",
                    backgroundColor: 'rgba(192, 192, 192, 0.8)',
                    borderColor: 'rgb(128, 128, 128)',
                    data: coinPrices,
                }]
            }
        });
    };

}