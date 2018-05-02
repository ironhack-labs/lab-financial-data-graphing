let arr = [];
let arr1 = [];

fetch('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(response => {
        if (!response.ok) return console.log(e);
        //lo regresas como json
        return response.json();
    })
    .then(data => {
        //la base de datos se llama data, es un array con objetos 
        //data.bpi es un objeto
        arr = Object.keys(data.bpi); //lo convertimos a un objeto para poder ver qué tienen sus llaves, la fecha
        arr1 = Object.values(data.bpi); //values es lo que tiene despues de las keys, el valor en sí, el precio
        console.log(arr, arr1);
        drawChart(arr, arr1);
    });

const drawChart = (d, p) => {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //fechas
            labels: d,
            datasets: [{
                label: 'Bitcoin Price',
                data: p,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                    /*,
                                         'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)' */
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                    /* ,
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)' */
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
}

document.getElementById("submit").onclick = () => {
    var from = document.getElementById("from");
    var to = document.getElementById("to");
    fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from.value}&end=${to.value}`)
        .then(response => {
            if (!response.ok) return console.log(e);
            //lo regresas como json
            return response.json();
        })
        .then(data => {
            //la base de datos se llama data, es un array con objetos 
            //data.bpi es un objeto
            arr = Object.keys(data.bpi); //lo convertimos a un objeto para poder ver qué tienen sus llaves, la fecha
            arr1 = Object.values(data.bpi); //values es lo que tiene despues de las keys, el valor en sí, el precio
            console.log(arr, arr1);
            drawChart(arr, arr1);
        });
};