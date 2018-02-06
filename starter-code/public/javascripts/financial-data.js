
// var starting = document.getElementById("start")
// // console.log(start.value)
// //console.log(e)
// console.log(starting.value);
// var ending = document.getElementById("end")
// // console.log(start.value)
// //console.log(e)
// console.log(ending.value);



//var value = addEventListener();

//startget = start.value;

document.getElementById("button").onclick = () => {
    url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${(document.getElementById("start").value)}&end=${(document.getElementById("end")).value}`

    axios
        .get(url)
        .then((response) => {

            var fechas = Object.keys(response.data.bpi)
            //console.log(fechas)
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: fechas,
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