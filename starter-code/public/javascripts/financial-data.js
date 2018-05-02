let arr = [];
let arr1 = [];

fetch ('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(response =>{
    if(!response.ok) console.log(e);
    return response.json();
})
.then(data => {
    console.log(data);
    arr = Object.keys(data.bpi);
    arr1 = Object.values(data.bpi);
    drawChart(arr,arr1);
})

const drawChart = (d, p) => {
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: d,
        datasets: [{
            label: 'BitCoins',
            data: p,
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

console.log(document)

document.getElementById('submit').onclick = () => {
    var from = document.getElementById('from');
    var to = document.getElementById('to');
    if(from.value > to.value) return
    fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from.value}&end=${to.value}`)
    .then(response =>{
        if(!response.ok) console.log(e);
        return response.json();
    })
    .then(data =>{
        console.log(data.bpi);
        arr= Object.keys(data.bpi)
        arr1= Object.values(data.bpi);
        drawChart(arr,arr1);
    })
}

}