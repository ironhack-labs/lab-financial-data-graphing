const minAndMax = (response) => {
    const xAxis = Object.keys(response.data.bpi);
    const yAxis = Object.values(response.data.bpi);
    const maxValue = (Math.max(...yAxis)).toFixed(2);
    const minValue = (Math.min(...yAxis)).toFixed(2);
    document.getElementById("max").innerHTML = maxValue;
    document.getElementById("min").innerHTML = minValue;
    drawCanvas(xAxis, yAxis);
}

axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => {
        minAndMax(response);
    })
    .catch(err => {
        console.log(err);
    });

const queryDates = (start, end) => {
    axios
        .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(response => {
            minAndMax(response);
        })
        .catch(err => {
            console.log(err);
        })
}

const queryWithCurrency = (currency) => {
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
        .then(response => {
            minAndMax(response);
        })
        .catch(err => {
            console.log(err);
        })
}

const drawCanvas = (labels, data) => {
    const ctx = document.getElementById("financialsChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                label: "Bitcoin chart",
                data: data
            }]
        }
    });
};

document.getElementById("date-btn").onclick = () => {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    queryDates(start, end);
};

document.getElementById("currency-btn").onclick = () => {
    const currency = document.querySelector("select").value;
    queryWithCurrency(currency);
};