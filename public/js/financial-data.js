document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("lab-financial-data-graphing JS imported successfully!");
        let myChart = null
        let currency = 'USD'

        let startDate = document.getElementById('start').value
        let endDate = document.getElementById('end').value

        const start = document.getElementById('start')
        start.addEventListener('input', setStartDate)

        const end = document.getElementById('end')
        end.addEventListener('input', setEndDate)

        const curr = document.getElementById('currency')
        curr.addEventListener('input', setCurrency)

        function setStartDate(start) {
            startDate = start.target.value
            console.log('startDate changed')
            printGraph(startDate, endDate, currency)
        }

        function setEndDate(end) {
            endDate = end.target.value
            console.log('endDate changed')
            printGraph(startDate, endDate, currency)
        }

        function setCurrency(curr) {
            currency = curr.target.value
            console.log('Currency: ', currency)
            printGraph(startDate, endDate, currency)
        }

        const printGraph = async (startDate, endDate, currency) => {
            if (myChart !== null) {
                console.log('Borrando')
                myChart.destroy()
            }
            console.log('Pintando')
            console.log(startDate)
            console.log(endDate)

            const res = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
            const btcPrices = res.data.bpi

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
        }
        printGraph(startDate, endDate, currency)
    },
    false
);
