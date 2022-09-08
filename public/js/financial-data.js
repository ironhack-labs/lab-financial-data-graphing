let apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-10-01";

document.getElementById('date1').addEventListener('input', () => {
    const date1 = document.getElementById('date1').value
    console.log(date1)
})

document.getElementById('date2').addEventListener('input', () => {
    const date2 = document.getElementById('date2').value
    console.log(date2)
})



// let apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-10-01";
// const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date1}&end=${date2}`;

let info;
axios
    .get(apiUrl)
    .then((res) => {
        console.log(res.data)

        const data = {
            datasets: [{
                label: 'CryptoMonedas',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: res.data.bpi,
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

    })
    .catch((err) => console.log(err))




