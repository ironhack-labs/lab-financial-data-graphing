

let startDate = document.getElementsByName("start-date")[0];
startDate.defaultValue = "2019-01-01";

let endDate = document.getElementsByName("end-date")[0];
endDate.defaultValue = new Date().toISOString().substring(0,10);

let currency = document.getElementsByTagName("select")[0];

getData ();

/* event listener */
startDate.onchange = getData;

endDate.onchange = getData;

currency.onchange = getData;


function getData () {
    console.log(startDate.value, endDate.value, currency.value );
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}&currency=${currency.value}`).then(response => 
        {
        var ctx = document.getElementById('chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(response.data.bpi),
                datasets: [{
                    label: 'Bitcoin Price Index',
                    data: Object.values(response.data.bpi),
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
        
        });
} 


