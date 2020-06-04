const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

axios
    .get(apiUrl)
    .then(({data: {bpi }}) => {
        console.log(bpi)
        printTheChart(bpi); // <== call the function here where you used to console.log() the response
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
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: bpiValues
                }]
            }
        })}