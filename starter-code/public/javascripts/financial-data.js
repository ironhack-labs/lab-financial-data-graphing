function AJAXRequest() {
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
        .then((data) => {
            console.log(data.data.bpi)
            print(data.data.bpi)
        })
}

function print(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.values(data)
            }]
        }
    });
}

AJAXRequest()