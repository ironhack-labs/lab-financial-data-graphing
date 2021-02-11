let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let mmMinus = String(today.getMonth()).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

let monthAgo = new Date();
monthAgo = yyyy + '-' + mmMinus + '-' + dd;

let chart = ''
let blueBorder = 'rgba(55, 109, 163, 1)'
let blueBackground = 'rgba(55, 109, 163, 0.5)'
let redBorder = 'rgba(220, 53, 69, 1)'
let redBackground = 'rgba(220, 53, 69, 0.5)'

let startDate = monthAgo
let endDate = today
let currency = document.getElementById("currency").value

let maxSpan = document.getElementById("maxSpan")
let minSpan = document.getElementById("minSpan")

let dataUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`

const setValues = function(max, min) {
    maxSpan.innerHTML = max + ' ' + currency;
    minSpan.innerHTML = min + ' ' + currency;;
};
const ctx = document.getElementById('my-chart').getContext('2d');
ctx.font = "16px Lucida Grande";
ctx.fillText(`Retrieving data...`, 0, 20);
axios
    .get(dataUrl)
    .then((r) => {
        const ctx = document.getElementById('my-chart').getContext('2d');
        ctx.font = "16px Lucida Grande";
        ctx.fillText(`Loading...`, 0, 20);
        return r;
    })
    .then((r) => {
        const xAxis = Object.keys(r.data.bpi)
        const yAxis = Object.values(r.data.bpi)
        const ctx = document.getElementById('my-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: xAxis,
            datasets: [
                {
                label: `CoinDesk Bitcoin Price Index (${currency})`,
                backgroundColor: redBackground,
                borderColor: redBorder,
                data: yAxis
                }
            ]
            }
        });
        return maxValue = Math.max(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), minValue = Math.min(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    })
    .catch(error => {
        console.log('Error getting API data. Check logs.')
        const ctx = document.getElementById('my-chart').getContext('2d');
        ctx.font = "16px Lucida Grande";
        ctx.fillText(`Error retrieving data.`, 0, 20);
        ctx.fillText(`Try again.`, 0, 40);
    })
    .finally(() => {
        setValues(maxValue, minValue)
    })


const changeCurrency = () => {
    currency = document.getElementById("currency").value;
    dataUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    chart.destroy()
    if (currency == 'EUR') {
        chartBackground = blueBackground;
        chartBorder = blueBorder;
    } else {
        chartBackground = redBackground;
        chartBorder = redBorder;
    }
    const ctx = document.getElementById('my-chart').getContext('2d');
    ctx.font = "16px Lucida Grande";
    ctx.fillText(`Retrieving data...`, 0, 20);
    axios
    .get(dataUrl)
    .then((r) => {
        const xAxis = Object.keys(r.data.bpi)
        const yAxis = Object.values(r.data.bpi)
        const ctx = document.getElementById('my-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: xAxis,
            datasets: [
                {
                label: `CoinDesk Bitcoin Price Index (${currency})`,
                backgroundColor: chartBackground,
                borderColor: chartBorder,
                data: yAxis
                }
            ]
            }
        });
        return maxValue = Math.max(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), minValue = Math.min(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    })
    .catch(error => {
        console.log('Error getting API data. Check logs.')
        const ctx = document.getElementById('my-chart').getContext('2d');
        ctx.font = "16px Lucida Grande";
        ctx.fillText(`Error retrieving data.`, 0, 20);
        ctx.fillText(`Try again.`, 0, 40);
    })
    .finally(() => {
        setValues(maxValue, minValue)
    })
}

const setFromDate = () => {
    fromDate = document.getElementById('fromDate').value;
    currency = document.getElementById("currency").value
    startDate = fromDate;
    chart.destroy();
    if (currency == 'EUR') {
        chartBackground = blueBackground;
        chartBorder = blueBorder;
    } else {
        chartBackground = redBackground;
        chartBorder = redBorder;
    }
    dataUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    const ctx = document.getElementById('my-chart').getContext('2d');
    ctx.font = "16px Lucida Grande";
    ctx.fillText(`Retrieving data...`, 0, 20);
    axios
    .get(dataUrl)
    .then((r) => {
        const xAxis = Object.keys(r.data.bpi)
        const yAxis = Object.values(r.data.bpi)
        const ctx = document.getElementById('my-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: xAxis,
            datasets: [
                {
                label: `CoinDesk Bitcoin Price Index (${currency})`,
                backgroundColor: chartBackground,
                borderColor: chartBorder,
                data: yAxis
                }
            ]
            }
        });
        return maxValue = Math.max(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), minValue = Math.min(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    })
    .catch(error => {
        console.log('Error getting API data. Check logs.')
        const ctx = document.getElementById('my-chart').getContext('2d');
        ctx.font = "16px Lucida Grande";
        ctx.fillText(`No data available from ${fromDate}.`, 0, 20);
        ctx.fillText(`Change date input.`, 0, 40);
    })
    .finally(() => {
        setValues(maxValue, minValue)
    })
}

const setToDate = () => {
    toDate = document.getElementById('toDate').value;
    currency = document.getElementById("currency").value
    endDate = toDate;
    chart.destroy();
    if (currency == 'EUR') {
        chartBackground = blueBackground;
        chartBorder = blueBorder;
    } else {
        chartBackground = redBackground;
        chartBorder = redBorder;
    }
    dataUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    const ctx = document.getElementById('my-chart').getContext('2d');
    ctx.font = "16px Lucida Grande";
    ctx.fillText(`Retrieving data...`, 0, 20);
    axios
    .get(dataUrl)
    .then((r) => {
        const xAxis = Object.keys(r.data.bpi)
        const yAxis = Object.values(r.data.bpi)
        const ctx = document.getElementById('my-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: xAxis,
            datasets: [
                {
                label: `CoinDesk Bitcoin Price Index (${currency})`,
                backgroundColor: chartBackground,
                borderColor: chartBorder,
                data: yAxis
                }
            ]
            }
        });
        return maxValue = Math.max(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), minValue = Math.min(...yAxis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    })
    .catch(error => {
        console.log('Error getting API data. Check logs.')
        const ctx = document.getElementById('my-chart').getContext('2d');
        ctx.font = "16px Lucida Grande";
        ctx.fillText(`No data available to ${toDate}.`, 0, 20);
        ctx.fillText(`Change date input.`, 0, 40);
    })
    .finally(() => {
        setValues(maxValue, minValue)
    })
}

    
