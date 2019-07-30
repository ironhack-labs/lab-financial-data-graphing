const coindeskAPI = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})


coindeskAPI.get('bpi')
    .then(response => printCharts(response.data))
    .catch(err => console.log('error', err))


const printCharts = info => {
    showLineChart('q1', info)
}

const showLineChart = (id, info) => {
    //console.log(info)
    //console.log(Object.getOwnPropertyNames(info.bpi))
    new Chart(id, {
        type: 'line',
        data: {
            labels: Object.getOwnPropertyNames(info.bpi),
            datasets: [{
                label: 'Btcoin Price Index',
                data: Object.values(info.bpi),
                borderColor: 'rgba(0, 50, 250, .7)',
                backgroundColor: 'rgba(0, 250, 50, .2)',
                borderWidth: 1
            }]
        }
    })
}

// EVENT LISTENER'
const getDateInfo = (startval, endval) => {
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startval}&end=${endval}`)
        .then(responseFromAPI => printCharts(responseFromAPI.data))
        .catch(err => console.log('Error is:', err))

    }

function generateDate() {
    
    let fromValue 
    let toValue 
    

    document.getElementById('from').onchange = () => {
        fromValue = document.getElementById('from').value
        console.log('este es el from', fromValue)
        if( fromValue && toValue ){
            getDateInfo(fromValue, toValue )
            console.log('me ejecuto')
        } else {
            console.log('Introduce fechas')
        }
        // const getFromValue =() => (fromValue)
    }

    document.getElementById('to').onchange = () => {
            toValue = document.getElementById('to').value
            console.log('este es el to', toValue)
            if( fromValue && toValue ){
                getDateInfo(fromValue, toValue )
                console.log('me ejecuto')
            } else {
                console.log('Introduce fechas')
            }
            // const getFromValue =() => (toValue)
        }

console.log(fromValue, toValue)




}
    
generateDate()
