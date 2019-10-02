let dados;

axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then (response => { 
    printTheChart(response.data)
    console.log(response)
    dados = response.data.bpi;
    console.log(dados);
})
.catch (err => { console.log(err)});

function printTheChart(stockData) {
    const dailyData = stockData["bpi"];
    console.log("passei por aqui")
    const stockDates = Object.keys(dailyData);
    const stockMonth = stockDates.map( date => dailyData[date]["4. close"] );

let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: stockDates,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockMonth
        }]
    },

    // Configuration options go here
    options: {}
});
}
let myDate;
object.oninput = function(){myDate};
object.addEventListener("input", myDate);

myDate.get("https://api.coindesk.com/v1/bpi/historical/close.json?start=<2019-09-01>&end=<2019-10-01>")