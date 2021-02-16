// const axios = require("axios");

let apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';
let dStart, dEnd, currency, min, max;
currency = "USD";
let minHtml = document.getElementById('maxValue');
let maxHtml = document.getElementById('minValue');

// // GET data from API

funAxios();
document.getElementById("dataForm").
    addEventListener("input", function () {
        dStart = document.getElementById("dStart").value;
        dEnd = document.getElementById("dEnd").value;
        console.log('start: ' + dStart)
        console.log('end: ' + dEnd)
        console.log('selec: ' + currency)
        if (dStart && dEnd) {
            if (dStart < dEnd) {
                apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dStart}&end=${dEnd}`;
                funAxios();
            } else if (dEnd < dStart) {
                alert("The first date has to be less than the last date!")
                // apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';
            }
        }
    });

document.getElementById("dataSelect").
    addEventListener("input", function () {
        currency = document.getElementById("dataSelect").value;
        console.log(currency)
        if (!dStart || !dEnd) {
            apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
        } else {
            apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dStart}&end=${dEnd}`;
        }
        funAxios();
    })



function funAxios() {
    axios
        .get(apiUrl)
        .then((response) => {
            const { data } = response;
            const xAxis = Object.keys(data['bpi'])
            console.log(xAxis)
            const yAxis = Object.values(data['bpi'])
                .map((dayData) => dayData)
            console.log(yAxis)
            min = (Math.min.apply(null, yAxis).toFixed(2));
            max = (Math.max.apply(null, yAxis).toFixed(2));
            console.log('min ' + min + ' max ' + max)
            minHtml.innerHTML =`Min: ${min} ${currency}`
            maxHtml.innerHTML =`Max: ${max} ${currency}`

            paintData(xAxis, yAxis);
        })
        .catch((e) => console.error("Error getting data", e));

    const paintData = (xAxis, yAxis) => {
        const ctx = document.getElementById('my-chart').getContext("2d");

        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: xAxis,
                datasets: [
                    {
                        data: xAxis,
                        label: 'Day',
                        borderColor: 'red',
                        backgroundColor: 'transparent'
                    },
                    {
                        data: yAxis,
                        label: 'BTC',
                        borderColor: 'blue',
                        backgroundColor: 'transparent'
                    }
                ]
            }
        })
    }
}
// node financial-data.js