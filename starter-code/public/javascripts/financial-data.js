//const chart = require('chart.js')
function chart(start, end, divise) {
const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=${divise}`;
fetch(url)
.then(res=>{
    if (!res.ok) return Promise.reject(res.statusText);
    return res.json();
})
    .then(stockData => {
        console.log(stockData);
        printTheChart(stockData);
    })
.catch(e=>console.log(e))
}
let printTheChart = ((stockData) => { //aunque es una variable, se puede usar como función
    let stockLabels = []; //array vacío
    for (var key in stockData.bpi) { //recorrer la información de bpi con una variable de llave
        stockLabels.push(key); //guardar en el array vacío la información que buscó con la llave
      }
      let stockPrice = [];
      for (var key in stockData.bpi) {
            stockPrice.push(stockData.bpi[key]); //Identifica el index de stockdata.bpi con un key y le envía su precio para linkearlo
          }
    let ctx = document.getElementById('myChart').getContext('2d'); //toma el id del canvas para dibujar la gráfica, por tanto necesita utilizar un canvas en el html
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
chart("2017-01-01", "2017-12-31", "USD");

var button = document.getElementById('boton');
button.addEventListener('click',()=>{
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let divise = document.getElementById("divise").value;
    chart(start,end,divise);
});