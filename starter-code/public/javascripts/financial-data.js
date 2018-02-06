const baseURL =  'https://api.coindesk.com/v1/bpi/historical/close.json'
let ctx = document.getElementById("myChart").getContext('2d');

axios.get(baseURL)
    .then(response => {
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(response.data.bpi) ,
                datasets: [{
                    label: 'Bitcoins',
                    data:Object.values(response.data.bpi) ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
            }
        });
    })