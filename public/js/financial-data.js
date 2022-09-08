
document.addEventListener(
    "DOMContentLoaded",
    () => {    
       
        const current = new Date()
        const x = new Date().setMonth(current.getMonth() - 3)
        const endDate = new Date(x).toISOString().split('T')[0]
        document.querySelector('#end').value  = endDate
        //console.log(endDate)
       // console.log( new Date().setMonth(current.getMonth() - 3).toISOString().split('T')[0])

        
        const start = new Date().setMonth(current.getMonth() - 6)
        const startDate = new Date(start).toISOString().split('T')[0]
        document.querySelector('#start').value = startDate

        
        const currency = document.querySelector('#currency').value
    // console.log(startDate) 
        let bitcoinDataUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`    
        //console.log(bitcoinDataUrl)
        axios.get(bitcoinDataUrl)
        .then(response => {
            console.log(response)
            printChart(response.data)
            
        })
        .catch(err => console.log(err))
    })


document.querySelectorAll('.selection').forEach(item => {
    item. addEventListener('change', () => {
        const startDate = document.querySelector('#start').value
        const endDate = document.querySelector('#end').value   
        const currency = document.querySelector('#currency').value
    // console.log(startDate) 
        let bitcoinDataUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`    
        //console.log(bitcoinDataUrl)
        axios.get(bitcoinDataUrl)
        .then(response => {
            console.log(response)
            printChart(response.data)
            
        })
        .catch(err => console.log(err))
    })
})


let myChart = null
const printChart = bitcoinData => {
    const dates = Object.keys(bitcoinData.bpi)
    console.log(dates)
    const prices = dates.map(date => {
        return bitcoinData.bpi[date]
    })
    const max = Math.max(...prices)
    document.querySelector('#max').innerText = `Max: ${max} ${currency.value}`

    const min = Math.min(...prices)
    document.querySelector('#min').innerText = `Min: ${min} ${currency.value}`

    console.log(prices)

    const ctx = document.querySelector('#myChart').getContext('2d')

    if (myChart !== null){
        myChart.destroy()
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Bitcoin Chart',
                    //backGroundColor: 'rgb(255, 0, 0)',
					//borderColor: 'rgb(255, 0, 0)',
                    borderWidth: 1,
                    data: prices,
                    fill: true
                }
            ]
        }

    })

}

