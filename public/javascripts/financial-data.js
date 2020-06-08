function requestDataFromApi(dateRange){
    let dataForRequest = '';
    let $currencyValue = document.getElementById('currencies').value;

    if(dateRange) dataForRequest = dateRange;
    
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?${dataForRequest}&currency=${$currencyValue}`)
        .then((response)=> {
            renderChart(response);
            evaluateValues(response);
        })
    .catch((err)=> {
        console.log(err, 'Error occured')
    })   
}

function evaluateValues(response){

    const arrayOfValues = Object.values(response.data.bpi);
    const minValue = Math.min.apply(Math, arrayOfValues);
    const maxValue = Math.max.apply(Math, arrayOfValues);
    const $lowestValueDom = document.getElementById('min-value');
    const $highestValueDom = document.getElementById('max-value');

    $lowestValueDom.innerHTML = minValue;
    $highestValueDom.innerHTML = maxValue;

}

function renderChart(response){
    const dateRange = Object.keys(response.data.bpi)
    const arrayOfValues = Object.values(response.data.bpi)
    const currencyResponse = response.data.disclaimer;
    const currencyValue = currencyResponse.slice(currencyResponse.length-4, response.data.disclaimer.length-1);
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateRange,
            datasets: [{
                label: currencyValue,
                data: arrayOfValues,
                borderColor: [],
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

document.querySelectorAll('.input-dates').forEach(item => {
    const $firstDate = document.querySelectorAll('.input-dates')[0];
    const $secondDate = document.querySelectorAll('.input-dates')[1];
    if($firstDate != '' && $secondDate != ''){
        item.addEventListener('change', (event) => {
            let $startDate = document.getElementById('start-date').value
            let $endDate = document.getElementById('end-date').value
        
            let dateRange = `?start=${$startDate}&end=${$endDate}`
        
            requestDataFromApi(dateRange);
        
        })
    }    
})

document.getElementById('currencies').addEventListener('change', (event) => {
    requestDataFromApi();
})


window.addEventListener('load', ()=>{
    requestDataFromApi();
})

