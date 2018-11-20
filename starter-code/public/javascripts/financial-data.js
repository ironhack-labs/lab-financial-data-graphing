

document.getElementById('currencyData').onclick = currencyClickHandler;






function currencyAJAXRequest() {
    let start = document.getElementById('start').value
    let end = document.getElementById('end').value
    let currency = document.getElementById('currency').value
    console.log(currency)
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`)
    .then((bitcoinData) => {

        let price = Object.values(bitcoinData.data.bpi)  
        let max = Math.max.apply(Math, price) 
        let min = Math.min.apply(Math, price)
        document.getElementById("max").innerHTML = max
        document.getElementById("min").innerHTML = min
    
  
        printTheChart(bitcoinData.data.bpi);

        
    })
    }


    function currencyClickHandler() {
        currencyAJAXRequest()
    }



    



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

    