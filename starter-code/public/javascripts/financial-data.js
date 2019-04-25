

//Grabbing API and setting the keys and values to the parameter that
// creates the chart. (createChart(key, value))
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(res => {
        createChart(Object.keys(res.data.bpi), Object.values(res.data.bpi))
        console.log(res.data)
    })


/*
Create the chart. Grabbed the chart from chartJS site. Added two paramters
that will be passed on from the API. It will represent the key and the value
from the information given. 

Replaced the date with the parameter and replaced the data with the paremeter.
*/
createChart = (date, data) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'HODL',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
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
}


function updateChart(start, end) {
    start = document.getElementById('start').value
    end = document.getElementById('end').value
}

