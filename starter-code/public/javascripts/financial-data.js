axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(response =>{
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys.bpi,
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [

            ],
            borderColor: [

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
