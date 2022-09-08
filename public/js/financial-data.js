document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("lab-financial-data-graphing JS imported successfully!");
        let myChart = null
        let currency = 'USD'

        let startDate = document.getElementById('start').value
        let endDate = document.getElementById('end').value

        // Pinta la primera vez
        printGraph(startDate, endDate, currency)

        const start = document.getElementById('start')
        start.addEventListener('input', setStartDate)

        const end = document.getElementById('end')
        end.addEventListener('input', setEndDate)

        const curr = document.getElementById('currency')
        curr.addEventListener('input', setCurrency)

        function setStartDate(start) {
            startDate = start.target.value
            console.log('startDate', endDate, startDate)
            printGraph(startDate, endDate, currency)
        }

        function setEndDate(end) {
            endDate = end.target.value
            console.log('endDate', endDate, startDate)
            printGraph(startDate, endDate, currency)
        }

        function setCurrency(curr) {
            currency = curr.target.value
            console.log('Currency: ', currency)
            printGraph(startDate, endDate, currency)
        }

        function printGraph(startDate, endDate, currency) {
            console.log('Borrando')
            if (myChart !== null) {
                myChart.destroy()
            }
            console.log('Pintando')
            console.log(startDate)
            console.log(endDate)

            let btcPrices

            axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
                .then((res) => {
                    btcPrices = res.data.bpi

                    const labels = Object.keys(btcPrices);

                    const maxPrice = Math.max(...Object.values(btcPrices))
                    const minPrice = Math.min(...Object.values(btcPrices))

                    document.getElementById('max').textContent = maxPrice
                    document.getElementById('min').textContent = minPrice

                    const data = {
                        labels: labels,
                        datasets: [{
                            label: 'BTC prices',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Object.values(btcPrices),
                        }]
                    };

                    const config = {
                        type: 'line',
                        data: data,
                        options: {}
                    };

                    myChart = new Chart(
                        document.getElementById('graph'),
                        config
                    );



                })
                .catch((err) => console.log(err))


        }
    },
    false
);
