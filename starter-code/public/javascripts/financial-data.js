const coinDeskApi = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi'
});
var ctx = document.getElementById("myChart").getContext("2d");

function getCoinInfo() {
    coinDeskApi
    .get("/historical/close.json") 
    .then(resul => {

let tab = resul.data.bpi;

const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(tab),
        datasets: [{
            data: Object.values(tab),
        }]
    },
});
}).catch (err => console.error(err));
Chart.defaults.line.spanGaps = true;
Chart.defaults.line.showLines = true;
}




