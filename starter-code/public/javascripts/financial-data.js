const ctx = document.querySelector('canvas').getContext('2d')
const start = document.querySelector('#start') //`http://api.coindesk.com/v1/bpi/historical/close.json??start=${startValue}&end=${endValue}`
const end = document.querySelector('#end')
const currency = document.querySelector('#currency')
const min = document.querySelector('#minvalue')
const max = document.querySelector('#maxvalue')
const today = Date.now
const createGraph = async (startValue, endValue, currency ='USD') => {
    let bitcoinPrice
    if(!startValue && !endValue){
        bitcoinPrice = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
    } else if(startValue && endValue) {
        bitcoinPrice = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}&currency=${currency}`)
    }
    
    const rawData = bitcoinPrice.data.bpi
    const labels = []
    const data = []

    for(let key in rawData){
        labels.push(key)
        data.push(rawData[key])
    }

    const minValue = data.reduce((acc, current) => {
        if (acc < current){
            return acc
        }else{
            return current
        }
    })
    const maxValue = data.reduce((acc, current) => {
        if (acc > current){
            return acc
        }else{
            return current
        }
    })

    min.innerHTML = `Min: ${minValue}`
    max.innerHTML = `Max: ${maxValue}`
    console.log(minValue)
    console.log(maxValue)

    console.log(labels, data)
    const myGraph = new Chart(ctx, {
        type: 'line',

        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data
            }]
        },
    
        // Configuration options go here
        options: {}
});
}      

createGraph().catch(e=>console.log(e))

const changeGraph = () => {
    const startValue = start.value
    const endValue = end.value
    const currencyValue = currency.value 
    createGraph(startValue, endValue, currencyValue)
}

start.onchange = changeGraph
end.onchange = changeGraph
currency.onchange = changeGraph