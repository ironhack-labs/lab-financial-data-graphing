let apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?start=2010-08-05&end=2022-05-05";
const startDate = document.querySelector('#startDate')
const finishDate = document.querySelector('#finishDate')

startDate.addEventListener('change', ({ target }) => {
    console.log(target.value)
})
finishDate.addEventListener('change', ({ target }) => {
    console.log(target.value)
})

function printChart(dates, prices) {   //Se llama esta funcion debajo, en axios
    const labels = dates;

    const data = {
        labels: labels,
        datasets: [{
            label: 'Bitcoin',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: prices,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


axios
    .get(apiUrl)
    .then(({ data }) => {
        console.log('The response from API: ', data.bpi);
        const btcPrice = data.bpi
        // console.log(Object.keys(btcPrice))

        const btcDates = Object.keys(btcPrice)

        // console.log(Object.values(btcPrice))

        const btcValues = Object.values(btcPrice)

        console.log('El MÁXIMO precio de Bitcoin ==>', Math.max(...btcValues))

        console.log('El MÍNIMO precio de Bitcoin ==>', Math.min(...btcValues))

        printChart(btcDates, btcValues)
    })
    .catch((err) => console.log('Error while getting the data: ', err));

