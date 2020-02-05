var ctx = document.getElementById('myChart').getContext('2d');
let $startDate = document.querySelector('#initial-date')
let $finalDate = document.querySelector('#final-date')
let values = []
let dates = []
const getData = async () => {
    let {data} = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    for (const key in data.bpi) {
        dates.push(key)
        values.push(data.bpi[key])
    }
     console.log(values, dates)
}
getData()

const filterData = async () => {
    let iniDate = $startDate.value
    let finDate = $finalDate.value
    console.log(iniDate, finDate)
    // let datesFilter = dates.map((date => {
    //     if(date >){}
    // })
}
filterData()
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Bitcoin data',
            data: values,
            backgroundColor: '',
            borderColor: 'rgba(165, 163, 0, 1)' ,
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


// $startDate.addEventListener('change', () => {
//     filterData()
// })

// $finalDate.addEventListener('change', () => {
//     filterData()
// })
