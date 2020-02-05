var ctx = document.getElementById('myChart').getContext('2d');
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

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dates,
        datasets: [{
            label: 'Bitcoin data',
            data: values,
            backgroundColor: 'rgba(3, 66, 96, 1)',
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
