function showMaxAndMin(data) {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    document.getElementById('max-value').innerHTML = maxVal;
    document.getElementById('min-value').innerHTML = minVal;
}

function drawChart(data) {
    const displayChart = document.getElementById('display-chart');
    displayChart.innerHTML = '';

    const canvasTag = document.createElement('canvas');
    canvasTag.setAttribute('id', 'my-chart');
    displayChart.appendChild(canvasTag);

    const dates = Object.keys(data);
    const values = Object.values(data);
    showMaxAndMin(values);

    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price Index',
                data: values,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        }
    });
}

function getPriceIndex() {
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;
    const currency = document.getElementById('currencies').value;

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = '';

    if (!fromDate && !toDate) {
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
        .then(res => drawChart(res.data.bpi))
        .catch(err => console.log(err)) 
    } else {
        if (!fromDate) fromDate = toDate;
        if (!toDate) toDate = fromDate;
    
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`)
            .then(res => drawChart(res.data.bpi))
            .catch(err => {
                console.log(err)
                errorMessage.style.color = 'red';
                if(new Date(fromDate) > new Date(toDate)) {
                    errorMessage.innerHTML = 'From date must be before To date';
                }
            })
    }
}

window.onload = () => {
    getPriceIndex();
    document.getElementById('fromDate').addEventListener('change', getPriceIndex);
    document.getElementById('toDate').addEventListener('change', getPriceIndex);
    document.getElementById('currencies').addEventListener('change', getPriceIndex);   
}
