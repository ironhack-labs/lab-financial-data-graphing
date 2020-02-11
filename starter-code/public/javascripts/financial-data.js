
let startDOMEl = document.querySelector('.start');
let endDOMEl = document.querySelector('.end');
let start = document.querySelector('.start').value.toString();
let end = document.querySelector('.end').value.toString();
let currencyDOMEl = document.querySelector('#currency');
let currency = document.querySelector('#currency').value;
let min = document.querySelector('.min')
let max = document.querySelector('.max')
let currecyType = document.querySelectorAll('.currencyType');
let myChartDomEl = document.querySelector('#myChart');



startDOMEl.onchange = function () {
   drawAll()
}
endDOMEl.onchange = function () {
   drawAll()
}
currencyDOMEl.onchange = function () {
   drawAll()
}

window.onload(drawAll());

function drawAll(){
    start = document.querySelector('.start').value;
    end = document.querySelector('.end').value;
    currency = document.querySelector('#currency').value;
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(responseFromAPI => {
        paintChart(responseFromAPI.data.bpi)
        let obj = responseFromAPI.data.bpi
        let values = Object.values(obj)
        console.log(values)
        let maxima = 0
        let minima = 0

        values.forEach(value => {
            if (value > maxima){
                maxima = value;
            }
            return maxima;
        })

        values.forEach(value => {
            minima = value;
            if (value < minima){
                minima = value;
            }
            return minima;
        })

        min.innerHTML = ` ${minima.toFixed(2)} ${currency}`;
        max.innerHTML = ` ${maxima.toFixed(2)} ${currency}`;
    });


}


function paintChart(dataPayload){
    let dates = Object.keys(dataPayload);
    let bitCoinValue = Object.values(dataPayload);
    let ctx = myChartDomEl.getContext('2d');
    let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: bitCoinValue,
            backgroundCoxlor: [
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
}