




let fecha1='2013-04-01'
let fecha2='2013-09-29'

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fecha1}&end=${fecha2}`)
.then(obj=>{
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:Object.keys(obj.data.bpi),
        datasets: [{
            label: '',
            data: Object.values(obj.data.bpi),       

           // data: [Object.values(obj.data.bpi)],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill:true,  
            //tension:20,  
            pointHoverRadius:20,
            borderColor:'rgb(255,99,132)',
            borderWidth: 1
        }]
    },
    options: 
    {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  console.log(Object.keys(obj.data.bpi))
  return obj
})

.catch(err=>{console.log('Nope')})


// var myLineChart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: options
// });