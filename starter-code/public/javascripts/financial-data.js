var priceArray = [];
var dateArray = [];

function getBitcoinInfo() {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json/?start=${startDate}&end=${endDate}`)
        .then(response => {
            console.log(response.data)
            dateArray= Object.keys(response.date.bpi)
            priceArray= Object.values(response.date.bpi)
            var myChart = new Chart(ctx, {
                type: 'Line',
                data: {
                    labels: dateArray,
                    datasets: [{
                        label: 'Bitcoin Price Index',
                        data: priceArray,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        })
        .catch(err => {
            console.error(err)
        })
}

document.getElementById("BitButton").onclick = function () {
    getBitcoinInfo();
}
var ctx = document.getElementById("myChart").getContext('2d');