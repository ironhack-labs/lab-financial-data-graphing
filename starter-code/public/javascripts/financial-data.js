const coinDeskAPI = axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')

console.log(coinDeskAPI)

let datei = document.getElementById('datei')
datei.onchange = () => { getCurrencyInfo() }
let datef = document.getElementById('datef')
datef.onchange = () => { getCurrencyInfo() }

// let dateArray = []
// let valueArray = ''

async function getCurrencyInfo() {
    if(datei.value === '' || datef.value === ''){
        return
    }
    if(datei.value > datef.value){
        return err
    }

    await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${datei.value}&end=${datef.value}`)
    .then(responseFromAPI => {
    const price = responseFromAPI.data.bpi

    let dateArray = Object.keys(price)
    let valueArray = Object.values(price)

    var ctx = document.getElementById('myChart').getContext('2d')
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateArray,
            datasets: [{
                label: '# of Votes',
                data: valueArray,
                backgroundColor: 'rgba(255, 159, 64, 0)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 3
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
})
.catch(err => {
        if(err.response.status === 404){
            removeCountryInfo();
            createDiv();
            const theErr = document.createTextNode(`No... ${theName}? `); 
            errDiv.appendChild(theErr);        
        } else {
            console.log('err => ', err)
        }
    })
}

getCurrencyInfo()