const url = 'http://api.coindesk.com/v1/bpi/historical/close.json'


axios.get(url)
.then(responseFromApi => {
    console.log(responseFromApi)
    let dataSet = responseFromApi.data.bpi
    const splitData = Object.keys(dataSet)
    const getValue = Object.values(dataSet)
    console.log(splitData)
    console.log(getValue)
    createChart(splitData,getValue)
})
.catch(error => {
    console.log(error)
})



function createChart(x,y){
var ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, 
    {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'Bitcoin Value Chart',
                data: y,
                backgroundColor: [
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



document.getElementById('start').addEventListener('change', () => {
    console.log('hello')
    filterData()
})

document.getElementById('end').addEventListener('change', () => {
    filterData()
})

function filterData(){
    const userDataS = document.getElementById('start').value
    const userDataE = document.getElementById('end').value
    const newURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${userDataS}&end=${userDataE}`
    axios.get(newURL)
    .then(response => {
        console.log(response)
        const set = response.data.bpi
        const split = Object.keys(set)
        const get = Object.values(set)
        createChart(split,get)
    })
    .catch(e => {
        console.log(e)
    })
}


