window.addEventListener('load', () => {

    let apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json"
    const ctx = document.getElementById('chart').getContext('2d')
    const MAX_VALUE = document.getElementById('max')
    const MIN_VALUE = document.getElementById('min')
    let CHART;

    axios.get(apiURL)
    .then(data => {
        createChart(data)
    })
    .catch(e => console.log(e))

    const apiCall = (url, chart, currency) => {
        axios.get(url)
            .then(data => {
                removeData()
                dates = Object.keys(data.data.bpi)
                prices = Object.values(data.data.bpi)
                updateData(chart, dates, prices)
                
                MAX_VALUE.innerHTML = Math.max(...prices).toFixed(2) + ' ' + currency
                MIN_VALUE.innerHTML = Math.min(...prices).toFixed(2) + ' ' + currency
            })
            .catch(e => console.log(e))
    }

    const removeData = () => {
        CHART.data.labels = []
        CHART.data.datasets = []
    }

    const updateData = (chart, label, prices) => {
        chart.data.labels = label
        chart.data.datasets = [
            {
                label: 'Bitcoin chart',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices
            }
        ]

        chart.update();
    }

    const createChart = (data) => {
        dates = Object.keys(data.data.bpi)
        prices = Object.values(data.data.bpi)

        CHART = new Chart(ctx, {
            type: 'line',
            data: {
            labels: dates,
            datasets: [
                {
                label: 'Bitcoin chart',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices
                }
            ]
            }
        })

        MAX_VALUE.innerHTML = Math.max(...prices).toFixed(2) + ' USD'
        MIN_VALUE.innerHTML = Math.min(...prices).toFixed(2) + ' USD'
    }
    
    const formSubmit = document.querySelector('#formDates')
    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let fromDate = document.getElementById('from-date').value
        let toDate = document.getElementById('to-date').value
        let currency = document.getElementById('currency').value

        if(fromDate && toDate && currency){
            apiURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
            apiCall(apiURL, CHART, currency)
        } else {
            apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json"
            apiCall(apiURL, CHART, currency)
        }
    })

})

