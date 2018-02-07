
document.getElementById("button").onclick = () => {
    console.log(document.getElementById("start").value);
    url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${document.getElementById("start").value}&end=${(document.getElementById("end").value)}&currency=${document.getElementById("currency").value}`
    axios
        .get(url)
        .then((response) => {
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(response.data.bpi),
                    datasets: [{
                        label: 'Bitcoin price index',
                        data: Object.values(response.data.bpi)
                        ,
                        backgroundColor: [
                            'rgba(255, 255, 0, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255,255,0,1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
        .catch((error) => {
            console.log(error);
        })
}