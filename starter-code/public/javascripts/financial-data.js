const $start = document.querySelector("#start")
const $end = document.querySelector("#end")
const $currency = document.querySelector("#currency")
const ctx = document.querySelector('#myChart').getContext('2d');



const getData = (startDate='2020-01-01', endDate='2020-01-31', currency='USD') => {
const apiBit = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

axios.get(apiBit).then(re => {
    
    
    const data = re.data.bpi


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Bit ',
            data: Object.values(data),
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
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
})
})
}

const updateInfo = ()=> getData($start.value, $end.value, $currency.value)

//getData('2020-01-01', '2020-01-10', 'USD')

$start.addEventListener('change', updateInfo)

$end.addEventListener('change', updateInfo)

$currency.addEventListener('change', updateInfo)