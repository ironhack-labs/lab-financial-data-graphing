//const apiUrl =`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`

const printTheChart = coinData => {
    const dataFromDb = coinData.data.bpi
    console.log(dataFromDb)

    //x value
    const dates = Object.keys(dataFromDb)
    console.log(dates)
 

    //y values
    const values = dates.map(date => {
        return dataFromDb[date]
    })
    console.log(values)

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: values,
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
})
};




//date call
const printTheDate = ((startDate,endDate, currency) => {
axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(response => {
        console.log(response);
       printTheChart(response);
       
    })
    .catch(err => {
        console.log('Error while getting the data', err);
    })
})

//currency call
// const printTheCurrency = ((currency) => {
//     axios
//         .get(`http://api.coindesk.com/v1/bpi/historical/close.json??currency=${currency}`)
//         .then(response => {
//             //console.log(response);
//            printTheChart(response);
//         })
//         .catch(err => {
//             console.log('Error while getting the data', err);
//         })
//     })
    // date is: 
    // const date = response.data.bpi

    // value is: 
    // const value = response.data.bpi
    //Object.keys(response.data.bpi)

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            const startDate = document.getElementById('inputone').value
            const endDate = document.getElementById('inputtwo').value
            printTheDate()
          });
    })

    document.querySelector('select').addEventListener('change', (event) => {
            const currency = document.querySelector('select').value

            console.log('hellooooooo')
            printTheDate()
          });
  