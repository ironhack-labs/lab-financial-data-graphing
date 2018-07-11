document.addEventListener("DOMContentLoaded", function (event) {

    let bitcoinsInfo = axios.create({
        baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
    });
    const restUrl = ``;

    bitcoinsInfo.get(restUrl)
        .then(pepe => {
            let datos = pepe.data.bpi
            let stockLabels = Object.keys(datos);
            let stockPrice = Object.values(datos);
            printTheChart(stockLabels, stockPrice);
        })
        .catch(error => console.log(error))

    let printTheChart = ((stockLabels, stockPrice) => {
        let ctx = document.getElementById('chart').getContext('2d');
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

    document.getElementById("fin").addEventListener("change", function () {
        let start = document.getElementById('inicio').value;
        let end = document.getElementById('fin').value;
        let bitcoinsInfo = axios.create({baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`});
        console.log(start, end)
        const restUrl = `?start=${start}&end=${end}`;
        console.log(restUrl)
        bitcoinsInfo.get()
            .then(pepe => {
                let datos = pepe.data.bpi
                let stockLabels = Object.keys(datos);
                let stockPrice = Object.values(datos);
                printTheChart(stockLabels, stockPrice);
            })
    })
});




