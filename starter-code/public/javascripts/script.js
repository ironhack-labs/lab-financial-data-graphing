console.log('ei')

document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
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


        var startDate
        var endDate
        var inputStart = document.getElementById('start')
        var inputEnd = document.getElementById('end')
        console.log(inputStart)
        inputStart.onchange= () => {
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
        /*inputStart.addEventListener('onchange',function(){
            console.log('cambio')

        })*/
        var selectCurrency = document.getElementById('currency')
        console.log(selectCurrency.value)
        selectCurrency.onchange = () =>{
            var currency = selectCurrency.value
            axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
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
    },
    false
);



document.getElementById('start')
document.getElementById('end')
