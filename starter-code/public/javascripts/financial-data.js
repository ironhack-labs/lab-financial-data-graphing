document.addEventListener('DOMContentLoaded', () => {
  // setTimeout(apiRequest,3000)
  console.log('Financial Data Graphing!');

}, false);

//form
document.querySelector("#graph").addEventListener("submit", apiRequest);

//Javascript se comunica con el 
function apiRequest(e){
  e.preventDefault();
  axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(result=>{
    let labels = Object.keys(result.data.bpi)
    let data = Object.values(result.data.bpi)
    graph(labels, data)
  })
  .catch(e=>{
    console.log(e)
  })
}


function graph(labels,data){
  var ctx = document.getElementById("myChart").getContext('2d');
  var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels:labels,
    datasets:[{
      label: 'Bitcoin Index Price',
      data:data
    }]
  },
  options: {}
});
}