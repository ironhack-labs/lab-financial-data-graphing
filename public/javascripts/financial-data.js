const ctx = document.getElementById('canvas').getContext('2d');

let fromDate = '';
let toDate = new Date().toISOString().slice(0, 10);
let startDay = new Date()
//Last 30 days
pastDate = startDay.getDate() - 30;
startDay.setDate(pastDate)

fromDate = startDay.toISOString().slice(0, 10);

const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`

document.getElementById('input-start-date').value = fromDate;
document.getElementById('input-end-date').value = toDate;


const getFinancialData = urlApi => {
    
    axios
    .get(urlApi, { crossdomain: true })        
    .then(response => {
        const dates = Object.keys(response.data.bpi) 
        const values = dates.map(date => response.data.bpi[date]);

        const data = {
            labels: [...dates],
            datasets: [{
                label: 'Current price',
                data: values,
                borderWidth: 1.5
            }]
        }
    

        let lineChart = new Chart(ctx, {
            type: 'line',
            data: data,
        });
    })
    .catch( err => {
        console.log(err);
    })
};

//first call with default URL
getFinancialData(url);

document.getElementById('input-start-date').addEventListener('change', () => {
    
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;
    let currency = document.getElementById('input-currency').value;
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

    getFinancialData(url);
})

document.getElementById('input-end-date').addEventListener('change', () => {
    
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;
    let currency = document.getElementById('input-currency').value;
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

    getFinancialData(url);
})

document.getElementById('input-currency').addEventListener('change', () => {
    
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;
    let currency = document.getElementById('input-currency').value;
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

    console.log(url);

    getFinancialData(url);
})
