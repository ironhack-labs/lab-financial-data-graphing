
const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
let from;
let to;
let currency;
let min;
let max;

const apiRequest = (url) => {
    axios.get(url)
      .then((response) => {
        const {data} = response
        let xAxis = Object.keys(data.bpi);
        let yAxis = Object.values(data.bpi);
        
        drawChart(xAxis,yAxis)
        limitValues(yAxis)
        document.getElementById('max__price').innerHTML = max
        document.getElementById('min__price').innerHTML = min
      })
      .catch((error) => {
        console.log(error);
      })
}

//MIN-MAX VALUES

const limitValues = (pricesArr) => {
    min = Math.min(...pricesArr).toFixed(2)
    max = Math.max(...pricesArr).toFixed(2)
}


//DRAW CHART
const drawChart= (xAxis,yAxis) => {
    const ctx = document.getElementById("myChart").getContext("2d")

    const chart = new Chart(ctx, {
        type: 'line',
        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Bitcoin Price Index',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxis
            }]
        },
        // Configuration options go here
        options: {}
    })
}

//Show default dates at the beggining
apiRequest(apiUrl) 

//Change values when change input field
document.getElementById('from__date').addEventListener('change', () => {
    from = document.getElementById('from__date').value
    refreshChart()
})
document.getElementById('to__date').addEventListener('change', () => {
    to = document.getElementById('to__date').value  
    refreshChart()
})
document.getElementById('currency').addEventListener('change', () => {
    currency = document.getElementById('currency').value
    console.log(currency)
    refreshChart()
})

//Refresh chart with new values if both inputs are changed
const refreshChart = () => {
    if(to != undefined && from !=undefined){
        if(!currency){
            apiRequest(`${apiUrl}?start=${from}&end=${to}`)
        }else{
            apiRequest(`${apiUrl}?start=${from}&end=${to}&currency=${currency}`) 
        }
    }else{
        if(!currency){
            apiRequest(apiUrl) 
        }else{
            apiRequest(`${apiUrl}?currency=${currency}`) 
        }   
    }
}
  



