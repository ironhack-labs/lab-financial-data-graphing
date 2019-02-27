var btn = $('#btn');

function bitcoinChart(start, end) {
    axios({
        method: 'get',
        url: `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${$('#currency').val()}&start=${start}&end=${end}`
    })
    .then((response) => {
        var dataKey = Object.keys(response.data.bpi);
        for(let i = 0; i < dataKey.length; i++) {
            arrKey.push(dataKey[i])
            arrVal.push(response.data.bpi[dataKey[i]])
        }
        drawChart(arrKey, arrVal);
        $('#min').append(Math.min.apply(Math, arrVal));
        $('#max').append(Math.max.apply(Math, arrVal));
    })
    .catch((err) => {
        throw err;
    })
}

var arrKey = [];
var arrVal = [];

var ctx = document.getElementById('myChart').getContext('2d');

function drawChart(arrKey, arrVal) {
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:arrKey,
            datasets: [{
                label: "Bitcoin price index",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrVal,
            }]
        }
    });
}



function clearData() {
    arrKey = [];
    arrVal = [];
}

btn.click(() => {
    clearData();
    $('#min').empty();
    $('#max').empty();
    var startDate = $('#start').val();
    var endDate = $('#end').val();
    bitcoinChart(startDate, endDate);
});
