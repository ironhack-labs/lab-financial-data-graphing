const bitcoinApi = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/'
});
let currency=document.getElementById('changecurrency').value;

bitcoinApi.get('/historical/close.json?currency='+currency)
.then(function(response){
    console.log(response);
    printTheChart(response.data.bpi);
    
})
.catch(function(error){
    console.log(error);
});

let printTheChart = ((stockData)=>{
    console.log(stockData);
    
    let stockDate =Object.keys(stockData);
    
    console.log(stockDate);
    let stockPrice = Object.values(stockData);
    
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx,{
        type: 'line',
        data: {
            labels: stockDate,
            datasets: [{
                label: "Bitcoin chart",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrice,
            }]
        }
    })
    document.getElementById("minL").innerHTML=Math.min.apply( Math, stockPrice );
    document.getElementById("maxL").innerHTML=Math.max.apply( Math, stockPrice );
})

document.getElementById('filterButton').onclick=function(){
    printFilter(document.getElementById('bdayInitial').value,document.getElementById('bdayFinal').value);

}
let printFilter = ((fechaInicial,fechaFinal)=>{
    console.log(fechaInicial);
    console.log(fechaFinal);
     bitcoinApi.get('/historical/close.json?start='+fechaInicial+'&end='+fechaFinal)
     .then(function(response){
         console.log(response);
         printTheChart(response.data.bpi);
      
     })
     .catch(function(error){
         console.log(error);
     });
})

let currencyChange=(()=>{
    currency=document.getElementById('changecurrency').value;
    bitcoinApi.get('/historical/close.json?currency='+currency)
        .then(function(response){
            console.log(response);
            printTheChart(response.data.bpi);   
        })
        .catch(function(error){
            console.log(error);
        });
})