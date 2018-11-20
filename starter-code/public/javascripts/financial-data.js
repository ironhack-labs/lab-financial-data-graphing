 window.onload = function () {
     function ajaxRecuest() {
         axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
             .then((coinData) => {
                 // console.log(coinData.data.bpi);
                 printTheChart(coinData.data.bpi)
             })
     }
     ajaxRecuest();


     const printTheChart = (jsonData => {
         const stockLabels = Object.keys(jsonData);
         const stockCoins = Object.values(jsonData);
         const ctx = document.getElementById('table').getContext('2d');
         //here we give the chart the data it needs
         const chart = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: stockLabels,
                 datasets: [{
                     label: "Stock Chart",
                     backgroundColor: 'rgb(255, 99, 132)',
                     fill: false,
                     tension: 0,
                     pointHoverRadius: 20,
                     borderColor: 'rgb(255, 99, 132)',
                     tension: 0,
                     data: stockCoins,
                 }]
             }
         });
     });

 }