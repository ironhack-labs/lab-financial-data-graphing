document.addEventListener("DOMContentLoaded",
() =>{
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then (info =>{ 
        console.log(info.data.time.updated)
        const labels = Object.keys(info.data.bpi) 
        const data = Object.values(info.data.bpi) 
        
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data ,
                    label:"bitcoin",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
        });
       

       
    }) .catch(e=>console.log(e))

    document.getElementById("form").onchange = ()=>{

     var from = document.getElementById("from").value
     var to = document.getElementById("to").value

     axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start="+ from + "&end="+ to)
     .then(info =>{ 
 
       const labels = Object.keys(info.data.bpi) 
       const data = Object.values(info.data.bpi) 
       
       var ctx = document.getElementById("myChart").getContext('2d');
       var myChart = new Chart(ctx, {
           type: 'line',
           data: {
               labels: labels,
               datasets: [{
                   data: data ,
                   label:"bitcoin",
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
       });
 
 
     })
     .catch(e=> console.log(e))



     var currency = document.getElementById("currency").value
     axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?currency="+ currency)
     .then(info =>{ 
 
       const labels = Object.keys(info.data.bpi) 
       const data = Object.values(info.data.bpi) 
       
       var ctx = document.getElementById("myChart").getContext('2d');
       var myChart = new Chart(ctx, {
           type: 'line',
           data: {
               labels: labels,
               datasets: [{
                   data: data ,
                   label:"bitcoin",
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
       });
 
 
     })
     .catch(e=> console.log(e))

    }
 


},
false);