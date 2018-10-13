axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => {
        //console.log(res.data);
        printTheChart(res.data);
    });

let ctx = document.getElementById('canvas').getContext('2d');

let printTheChart = ((stockData)=> {
    //console.log(stockData.bpi);
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(stockData.bpi),
            datasets: [{
                label: 'BPI real-time data',
                backgroundColor: 'rgba(29,99,211,.5)',
                borderColor: 'rgb(29,99,211)',
                data: Object.values(stockData.bpi),
            }],
        },
    });
});


let startDate = document.getElementById('start');
let endDate = document.getElementById('end');

function changeChart() {
    let start = startDate.value;
    let end = endDate.value;

    if(start === '') {
        start = new Date().toISOString().slice(0, 10);
    }
    if(end === '') {
        end = new Date().toISOString().slice(0, 10);
    }

    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json?start='+start+'&end='+end)
        .then(res => {
            //console.log(res.data);
            printTheChart(res.data);
        });
}

startDate.addEventListener("change", changeChart);
endDate.addEventListener("change", changeChart);