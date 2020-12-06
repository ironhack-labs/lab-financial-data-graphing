const url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
const ctx = document.getElementById('canvas').getContext('2d');



const getFinancialData = urlApi => {
    
    axios
    .get(urlApi, { crossdomain: true })        
    .then(response => {
        const dates = Object.keys(response.data.bpi) 
        const values = dates.map(date => response.data.bpi[date]);

        const data = {
            labels: [...dates],
            datasets: [{
                label: 'No words needed',
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

document.getElementById('input-start-date');addEventListener('change', () => {
    
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;
    
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`

    getFinancialData(url);
})

document.getElementById('input-end-date');addEventListener('change', () => {
    
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;
    
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`

    getFinancialData(url);
})

