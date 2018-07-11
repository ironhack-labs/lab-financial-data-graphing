const chart = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"

const url = 'http://api.coindesk.com/v1/bpi/historical/close.json'

fetch(url)
.then(res=>{
  if(!res.ok) return Promise.reject(res.statusText);
  return res.json();
})
.then(data=>{
  //console.log(data);
  printTheChart(Object.keys(data.bpi), Object.values(data.bpi));
})
.catch(err=>console.log(err))


let printTheChart = ((data1, data2) => {
console.log(data2)
  let stockLabels = data1.map( element => element);
  let stockPrice = data2.map( element => element);
  let ctx = document.getElementById('canvas').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice,
      }]
    }
  });
});

document.getElementById('button').onclick = () =>{
  console.log('button')
  var desde = document.getElementById('start');
  var hasta  = document.getElementById('end');
  if (desde.value > hasta.value) return
  fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${desde.value}&end=${hasta.value}`)
  .then(result => {
    if(!result.ok) console.log(e);
      return result.json();
  })
  .then(currencies => {
    valor1 = Object.keys(currencies.bpi);
    valor2 = Object.values(currencies.bpi);
    printTheChart(valor1, valor2);
  });
};