const blockchainInfo = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
});


document.getElementById("filterButton").onclick = function () {

    let startDate = document.getElementById('startDate').value.toString();
    let endDate = document.getElementById('endDate').value.toString();


      console.log("HERE is DATE: ",startDate,endDate)

    let currencyType = document.getElementById('currencyType').value.toString();
    //     console.log("HERE is the Currency: ", currencyType);
    let postfix = '?currency='+currencyType+'&start='+startDate+'&end='+endDate;
    console.log("Here is Postfix",postfix);
    

    Promise.all([

        blockchainInfo.get(`${postfix}`)
    ])
        .then(function (data) {
            // console.log(data[0].data.bpi);
            printTheChart(data[0].data.bpi);
        })

    let printTheChart = ((data) => {
        let labels = Object.keys(data).map(function (key) {
            return [key];
        });
        console.log(labels);
        let prices = Object.keys(data).map(function (key) {
            return data[key];
        });

        document.getElementById('max-value').innerText = Math.max(...prices);
        document.getElementById('min-value').innerText = Math.min(...prices);

        console.log(prices);

        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "btn",
                    borderColor: 'rgb(255, 100, 0)',
                    data: prices,
                }]
            }
        });
    });

}