const financialData = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/'
})

financialData.get("close.json")
    .then(response => {
        printTheChart(response.data.bpi);
    })
    .catch(error => {
        console.log(error);
    });

const printTheChart = (stockData => {
    const stockLabels = Object.keys(stockData);
    const stockPrice = Object.values(stockData);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
         data: {
            labels: stockLabels,
            datasets: [{
              label: "Bitcoin Price Index",
              backgroundColor: '#e9e9e9',
              borderColor: 'rgb(255, 99, 132)',
              data: stockPrice,
            }]
          }
        });
      });

let startDate;
let endDate;

document.getElementById('filter').onclick = function(){
    startDate = document.getElementById('dateFrom').value;
    endDate = document.getElementById('dateTo').value;
    financialData.get(`close.json?start=${startDate}&end=${endDate}`)
        .then(response => {
            printTheChart(response.data.bpi);
        })
        .catch(error => {
            console.log(error);
        });
}
// document.getElementById('currency').onchange = function(e){
//     e.preventDefault();
//     currency = document.getElementById('currency').value;
//     console.log('TCL: document.getElementById -> `close.json?index=[${currency}]?start=${startDate}&end=${endDate}`', `close.json?index=[${currency}]?start=${startDate}&end=${endDate}`)
//     financialData.get(`close.json?index=[${currency}]?start=${startDate}&end=${endDate}`)
// 		.then(response => {
//             printTheChart(response.data.bpi);
// 			console.log('TCL: document.getElementById -> response.data.bpi', response.data.bpi)
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }
