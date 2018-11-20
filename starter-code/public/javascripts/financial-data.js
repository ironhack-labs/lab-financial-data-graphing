 window.onload = function () {
     function ajaxRecuest(myDate) {
         let rute = 'https://api.coindesk.com/v1/bpi/historical/close.json';
         if (myDate) {
             if (myDate.type === 'start') {
                 rute = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${myDate.date}&end=${myDate.otherDate}`
             } else {
                 rute = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${myDate.otherDate}&end=${myDate.date}`
             }

         }

         axios.get(rute)
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
     let date1 = document.getElementById('date1').value;
     let date2 = document.getElementById('date2').value;

     document.getElementById('date1').onchange = function () {

         let dateStart = {
             type: 'start',
             date: date1,
             otherDate: date2
         }
         ajaxRecuest(dateStart);
     }

     document.getElementById('date2').onchange = function () {

         let dateEnd = {
             type: 'end',
             date: date2,
             otherDate: date1
         }
         ajaxRecuest(dateEnd);
     }
     //  document.getElementById('date2').onchange = countrySelectorChangeHandler
 }