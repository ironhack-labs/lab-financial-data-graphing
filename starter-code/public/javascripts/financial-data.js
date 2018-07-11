//const stockInfo  = axios.create({
//  baseURL: "https://api.coindesk.com/v1/bpi/historical/close.json",
//});
const startDate = document.getElementById('fromdate').addEventListener("change", () =>{

})   
const endDate = document.getElementById('todate').value;

axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
  .then(response => {
    printTheChart(response.data.bpi)
  })
  .catch(error => {
    console.log(error);
});

let printTheChart = ((stockData) => {
  console.log(stockData)

  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(stockData),
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: Object.values(stockData),
      }]
    }
  });
});