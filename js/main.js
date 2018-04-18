var myURL ='';



function getBtcInfo(url) {

 

 axios.get(url)
   .then(response => {
     console.log(response.data)
     return response.data.bpi;
   })
   .then(response => {
     drawChart(response);
   })

   .catch(err => {
     console.error(err)
   })
}


const drawChart = bitcoinPrices => {
 console.log(bitcoinPrices);
 let stockLabels = Object.keys(bitcoinPrices);
 let stockPrice = Object.values(bitcoinPrices);
 console.log(stockLabels)
 console.log(stockPrice)
 let ctx = document.getElementById('ppp').getContext('2d');
 let chart = new Chart(ctx, {
   type: 'line',
   data: {
     labels: stockLabels,
     datasets: [{
       label: 'Stock Chart',
       data: stockPrice
     }]
   }
 })
}



$(document).ready( function(){
  $('#btnActualizar').click(function(){
   fecha1 = $('#fechaInicio').val();
   fecha2 = $('#fechaFin').val();
   myURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fecha1}&end=${fecha2}`  
   getBtcInfo(myURL);
  })
 
 
})

;