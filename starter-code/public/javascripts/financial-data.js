const ctx = document.getElementById('graph').getContext('2d')
const start = document.querySelector('#start')
const end = document.querySelector('#end')

const createGraph = async (startValue, endValue) => {
    let bitcoinInfo
    if (!startValue && !endValue) {
        bitcoinInfo = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    }else if(startValue && endValue){
        bitcoinInfo = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}`)
    const bitcoinData = bitcoinInfo.data.bpi
    console.log(bitcoinData)

    const labels = []
    const data = []

    for (const key in bitcoinData) {
        labels.push(key)
        data.push(bitcoinData[key])
    }
    const myGraph = new Chart(ctx, {
        type: 'line',

        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: 'Bitcoin Price',
                backgroundColor: '#2f4f4f',
                borderColor: '#008b8b',
                data
            }]
        },
        options: {}
    })
}

createGraph()

const changeGraphic = () => {
    const startValue = start.value
    const endValue = end.value
    createGraph(startValue, endValue)
}

start.onchange = changeGraphic
end.onchange = changeGraphic