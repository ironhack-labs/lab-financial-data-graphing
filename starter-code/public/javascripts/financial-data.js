document.addEventListener('DOMContentLoaded', () => {
  // setTimeout(apiRequest,3000)
  console.log('Financial Data Graphing!');

}, false);

//form
document.querySelector("#graph").addEventListener("submit", apiRequest);
// document.querySelector("#currency").addEventListener("onchange", apiRequest);
// document.querySelector("#end").addEventListener("blur", apiRequest);

//Javascript se comunica con el 
function apiRequest(e){
  e.preventDefault();
  let start = e.target.start.value
  let end = e.target.end.value
  let currency = e.target.currency.value
  let url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
  if(start !== '' && end !== ''){
    url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
  }
  axios.get(url)
  .then(result=>{
    let labels = Object.keys(result.data.bpi)
    let data = Object.values(result.data.bpi)
    let max = document.getElementById('max')
    max.innerHTML =  `Min: ${Math.max.apply(Math, data)}`
    let min = document.getElementById('min')
    min.innerHTML =  `Min: ${Math.min.apply(Math, data)}`
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