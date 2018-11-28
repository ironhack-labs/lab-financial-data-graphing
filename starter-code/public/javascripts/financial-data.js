document.addEventListener(
    "DOMContentLoaded",
    () => {
        axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
            .then(info => {
                const labels = Object.keys(info.data.bpi)
                const data = Object.values(info.data.bpi)


                var ctx = document.getElementById("myChart").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Bitcoin values'
                        }
                    }
                });
                console.log(info.data.time.updated)
            }).catch(err => console.log(err))

        var startDate
        var endDate
        var inputStart = document.getElementById('start')
        var inputEnd = document.getElementById('end')
        console.log(inputStart)
        inputStart.onchange = () => {
            console.log("Hola perro")
            console.log(inputStart.value)
            startDate = inputStart.value
            inputEnd.onchange = () => {
                endDate = inputEnd.value
                axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
                    .then(function (response) {
                        console.log(response.data);
                        const keys = Object.keys(response.data.bpi)
                        const values = Object.values(response.data.bpi)
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
            }
        }
    },
    false
)