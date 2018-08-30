$('.button').click(e => {
    e.preventDefault()
    let startVal = $('.startDate').val();
    let endVal = $('.endDate').val()
    let val = "?start=" + startVal + "&end=" + endVal;
    callApi(val);
})

callApi("");


function callApi(val) {

    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json" + val)
        .then(data => {
            console.log(data.data.bpi);

            let bpi = data.data.bpi;
            let labels = Object.keys(bpi);
            let numbers = Object.values(bpi);

            console.log(labels);
            console.log(numbers);

            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: numbers,
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
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
};