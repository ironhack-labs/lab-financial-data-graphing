const bitApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});


function getBitInfo() {
  bitApi
    .get()
    .then(response => {
      
      printTheChart(response.data.bpi);
      
    })
    .catch(err => {
      console.error(err);
    });
}

let printTheChart = ((data) => {
  let dataLabels = Object.keys(data);
  let dataPrice = Object.values(data);
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: '',
        borderColor: 'rgb(255, 99, 132)',
        data: dataPrice,
      }]
    }
  });
});

document.getElementById("bitButton").onclick = function() {
  getBitInfo();
};
