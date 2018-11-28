axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
.then( response => {
    const keys = Object.keys(response.data.bpi)
    const values = Object.values(response.data.bpi)

    let max = document.getElementById('maximum')
    let min = document.getElementById('minimum')
    min.innerText = response.data.bpi[keys[0]]
    max.innerText = response.data.bpi[keys[keys.length - 1]]

    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: keys,
        datasets: [
            {
                data:values, 
                label: "Bitcoin Price Index",
                fill: true
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'USD'
        }
    }
    })
})
.catch(err => console.log(err))

let startDateInput = document.querySelector('#startDate')
let endDateInput = document.querySelector('#endDate')
let currencyInput = document.querySelector('#currency')

currencyInput.addEventListener('change', function () {
    let currencyType = currency.value
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyType}`)
    .then(response => {
        const keys = Object.keys(response.data.bpi)
        const values = Object.values(response.data.bpi)

        let max = document.getElementById('maximum')
        let min = document.getElementById('minimum')
        min.innerText = response.data.bpi[keys[0]]
        max.innerText = response.data.bpi[keys[keys.length - 1]]

        let ctx = document.getElementById("myChart").getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: keys,
                datasets: [
                    {
                        data: values,
                        label: "Bitcoin Price Index",
                        fill: true
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: `${currencyType}`
                }
            }
        })
    })
    .catch(err => console.log(err))
})

startDateInput.addEventListener('change', endChange())

function endChange(){
    endDateInput.addEventListener('change', function(){
        let currencyType = currency.value
        let startDate = startDateInput.value
        let endDate = endDateInput.value
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&?currency=${currencyType}`)
        .then(response => {
            const keys = Object.keys(response.data.bpi)
            const values = Object.values(response.data.bpi)

            let max = document.getElementById('maximum')
            let min = document.getElementById('minimum')
            min.innerText = response.data.bpi[keys[0]]
            max.innerText = response.data.bpi[keys[keys.length - 1]]
            
            let ctx = document.getElementById("myChart").getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [
                        {
                            data: values,
                            label: "Bitcoin Price Index",
                            fill: true
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: `${currencyType}`
                    }
                }
            })
        })
        .catch(err => console.log(err))
    })
}
