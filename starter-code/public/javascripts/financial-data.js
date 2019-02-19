
var myData;

var ctx = document.getElementById("myChart").getContext('2d');

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json').then(response=>{
  myData = response.data.bpi;
  drawChart(myData)
})

function drawChart(myData){
  let labelsArray = [];
  let dataArray = []
  for(var key in myData){
    labelsArray.push(key);
    dataArray.push(myData[key]);
  }
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelsArray,
        datasets: [{
            label: 'Price',
            data: dataArray,
           
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        }
    }
});
}

function updateDate(){
  console.log('update')
  var dateStart = document.getElementById('dateStart').value
  var dateEnd =  document.getElementById('dateEnd').value
  let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}`
  axios.get(url)
  .then(response=>{
    console.log(response)
    let MyData = response.data.bpi; 
    drawChart(MyData);
  })
}


document.getElementById('dateStart').onchange = updateDate
document.getElementById('dateEnd').onchange = updateDate







