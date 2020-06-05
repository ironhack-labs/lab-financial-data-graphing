//const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'
let dates = document.querySelectorAll('input')
dates.forEach(elem => elem.addEventListener('input', () => {
    checkByDates()
}))

const currency = document.querySelector('select#currencyCode')
currency.addEventListener('change', () => {

})

axios
    .get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(({data: {bpi }}) => {
        printTheChart(bpi);
        const prices = Array.from(Object.values(bpi));
        showValues(prices);
    })
    .catch(err => console.log('Error while getting the data: ', err));

    function printTheChart(bpiData) {
        
        const bpiDate = Object.keys(bpiData);
        const bpiValues = Object.values(bpiData)
        const ctx = document.querySelector('canvas').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: bpiDate,
                datasets: [{
                    label: 'Bitcoin Price',
                    backgroundColor: 'rgba(10, 70, 90, .4)',
                    borderColor: 'rgb(25, 99, 132)',
                    data: bpiValues
                }]
            }
        })}

        function showValues(pricesArr){
            let maxV = document.getElementById('maxValue');
            let minV = document.getElementById('minValue');
            maxV.innerHTML = Math.max(...pricesArr)
            minV.innerHTML = Math.min(...pricesArr)
        }

        function checkByDates () {
            const fromDate = document.querySelector('#fromDate').value
            const toDate = document.querySelector('#toDate').value
            const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
            axios
                .get(apiUrl)
                .then(({
                    data: {
                        bpi
                    }
                }) => {
                    printTheChart(bpi);
                    const prices = Array.from(Object.values(bpi));
                    showValues(prices);
                })
                .catch(err => console.log('Error while getting the data: ', err));
        }

         

