console.log('ei')

document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
            .then(function (response) {
                console.log(response.data.bpi);
                const keys = Object.keys(response.data.bpi)
                const values = Object.values(response.data.bpi)
                console.log(Object.keys(response.data.bpi))
                console.log(Object.values(response.data.bpi))
                var ctx = document.getElementById("myChart").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                data: values,
                                label: "Bitcoin values",
                                borderColor: "#c45850",
                                fill: false
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Bitcoin live values'
                        }
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    false
);



