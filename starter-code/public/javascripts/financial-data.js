
// function updateChart() {
//     axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
//         .then(info => {
//             console.log(info.data.bpi)
//             console.log('DEBUG', Object.keys(info.data.bpi))
//             //     var info = Object.keys(obj).map(function(info) {
//             //         return {y: info.data.bpi}

//         })
// }
// updateChart()




function updateChart(from, to) {
    var test = ""
    if (from && to){
        console.log("line 20")
        var test = `?start=${from}&end=${to}`    
    }
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json${test}`)
      .then( (info) =>{
            var keys = Object.keys(info.data.bpi)
            var values = Object.values(info.data.bpi)
            /* console.log('keys', keys)
            console.log('value', values) */

            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'Bitcoin Price Index',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
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
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}
updateChart()

document.getElementById('form').onchange = () => {
    var from = document.getElementById('from').value
    var to  = document.getElementById('to').value
    console.log("hello",from,to)
    
    updateChart(from, to)
}



