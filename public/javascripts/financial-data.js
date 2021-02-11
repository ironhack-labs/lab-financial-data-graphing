window.addEventListener('load', () => {

    let apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json"
    const ctx = document.getElementById('chart').getContext('2d')
    let CHART;

    axios.get(apiURL)
    .then(data => {
        createChart(data)
    })
    .catch(e => console.log(e))

    const apiCall = (url, chart) => {
        axios.get(url)
            .then(data => {
                removeData()
                dates = Object.keys(data.data.bpi)
                prices = Object.values(data.data.bpi)
                updateData(chart, dates, prices)
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
        console.log(chart)
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
        console.log(CHART)
    }
    
    const formSubmit = document.querySelector('#formDates')
    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault()
        
        let fromDate = document.getElementById('from-date').value
        let toDate = document.getElementById('to-date').value
        let currency = document.getElementById('currency').value

        if(fromDate && toDate && currency){
            apiURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
            apiCall(apiURL, CHART)
        } else {
            apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json"
            apiCall(apiURL, CHART)
        }
    })

})

