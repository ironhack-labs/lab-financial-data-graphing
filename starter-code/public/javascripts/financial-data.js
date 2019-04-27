// const historicalData  = axios.create({
//   baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json`,
// });
const url = `https://api.coindesk.com/v1/bpi/historical/close.json`;

function getData (startDate, endDate) {
  axios.get(`${url}?start=${startDate}&end=${endDate}`)
  .then(response => {
    printTheChart(response.data.bpi);
  })
  .catch(err => {
    console.log('entrou no catch');
    console.log(err);
  })
}

const printTheChart = (data => {
  const result = Object.keys(data).map(function(key) {
    return [key, data[key]];
  });
  const dataLabels = result.map( element => element[0]);
  const dataValues = result.map( element => element[1]);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataLabels,
      datasets: [{
        label: "Historical Data",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataValues,
      }]
    }
  });
});

document.getElementById("theButton").onclick = function(){
  const startDate = document.getElementById("startDate").value; 
  const endDate = document.getElementById("endDate").value;  
  getData(startDate, endDate);
}