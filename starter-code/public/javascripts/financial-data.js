

document.getElementById('getCountryData').onclick = countryDataClickHandler;


function renderHTMLIronhack(bitcoinData) {
    document.querySelector('.country-name').innerText = bitcoinData.name
    document.querySelector('.country-phone-prefix').innerText = bitcoinData.prefix
}



function makeCountryAJAXRequest() {
    // let chosenCurrency = document.querySelector('#').value
    
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then((bitcoinData) => {
        
        printTheChart(bitcoinData.data.bpi);
    })
    }


    function countryDataClickHandler() {
        makeCountryAJAXRequest()
    }






    

    // function drawCompanyResultsChart(stockTicket) {
        
        //  const stockInfo = axios.create({
        //      baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json` ,
        //  });
        // //we are crafting this URL : https://api.iextrading.com/1.0/stock/aapl/chart
        // stockInfo.get(`${stockTicket}/chart`)
        //     .then(response => {
                // printTheChart(stockInfo.data.bpi);
            // })
            // .catch(error => {
            //     console.log(error);
            // });
        //chart rendering function
        const printTheChart = (stockData => {


            const stockLabels = Object.keys(stockData);

            const stockPrice = Object.values(stockData);


            const ctx = document.getElementById('myChart').getContext('2d');

            //here we give the chart the data it needs

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: stockLabels,
                    datasets: [{
                        label: "Stock Chart",
                        backgroundColor: 'rgb(21, 170, 151)',
                        fill: true,
                        tension: 0,
                        pointHoverRadius: 20,
                        borderColor: 'rgb(0, 0, 0)',
                        data: stockPrice,
                    }]
                }
            });
        });
    // }

    