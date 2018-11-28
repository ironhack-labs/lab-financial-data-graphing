const BTC_hist = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json'
})

BTC_hist.get()
.then(result=>{
    recieveBtcData(result.data.bpi)
})
.catch(e=>{
    console.log(e)
})

function recieveBtcData (btc_historical_prices){
    const btc_d = Object.keys(btc_historical_prices)
    const btc_p = Object.values(btc_historical_prices)
}

var ctx = document.getElementById('myChart').getContext('2d')
var myChart = new myChart(ctx,{
    type: 'line',
    data:{
        labels:keys,
        datasets: [
            {
                data:values,
                label:"Bitcoin values",
                borderColor: black,
                fill:false
            }
        ]
    },
    options:{
        title:{
            display:true,
            text: 'Bitcoin live values'
        }
    }
})