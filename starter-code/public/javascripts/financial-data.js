const bitcoinPrice = [];
let startDate = document.getElementById("startDate").value;
let endDate = document.getElementById("endDate").value;

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then((res) =>{
    
console.log(res.data.bpi)

    var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data:
        {
            labels: Object.keys(res.data.bpi),
            datasets: 
            [{
                label: "Bitcoin Price Index",
                data: Object.values(res.data.bpi),
                borderWidth: 1
            }]
        },
    });
})

