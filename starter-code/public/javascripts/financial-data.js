function getData(start, end, currency) {
    axios({
        method: "get",
        url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
        // url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        // url: "http://api.coindesk.com/v1/bpi/historical/close.json"
    })
    .then((res) => {
        var dayKeys = Object.keys(res.data.bpi)
        var values = Object.values(res.data.bpi)
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dayKeys,
                datasets: [{
                    label: "Bitcoin Price Index",
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                }]
            }
        })
        var minValue = Math.min.apply(null, values)
        var maxValue = Math.max.apply(null, values)
        // console.log(currency)
        $("#min-val").text(minValue)
        $("#max-val").text(maxValue)
        $(".currency").text(currency)
    })
    .catch((err) => {
        console.log(err)
    })
}

$("#submit").click(() => {
    var startInfo = $("#start").val()
    var endInfo = $("#end").val()
    var currencyInfo = $("#currency option:selected").val()
    getData(startInfo, endInfo, currencyInfo)
})

