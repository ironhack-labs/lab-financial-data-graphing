let $startDate = document.querySelector('#start-date')
let $endDate = document.querySelector('#end-date')
let $cur = document.querySelector('#currency')
let $btn = document.querySelector('#btn')

//chart setup
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data:
    {
        labels: [],
        datasets: [{
            label: 'Price of Bitcoin',
            data: []
        }]
    },
    options: {}
});


//search eventlistener
$btn.addEventListener('click', ()=>{
    console.log($cur.value)
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${$startDate.value}&end=${$endDate.value}&currency=${$cur.value}`)
        .then(apiData=>{
            let data = apiData.data.bpi
            myChart.data.labels = Object.keys(data)
            myChart.data.datasets[0].data = Object.values(data)
            myChart.update()
        })
        .catch(err=>console.log('<>< ERROR >< @axios.get(coindesk) >< ERROR ><>', err))
})