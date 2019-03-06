const fromInput = document.querySelector("#fromDate")
const toInput = document.querySelector("#toDate")
const currency = document.querySelector("#currency")


fromInput.onchange = function () {
    getData(fromInput.value, toInput.value, currency.value)
}

toInput.onchange = function () {
    getData(fromInput.value, toInput.value, currency.value)
}

currency.onchange = function () {
    getData(fromInput.value, toInput.value, currency.value)
}

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => printTheChart(response.data.bpi))
    .catch(error => console.log(error))

const getData = (from, to, currency) => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
    .then(response => printTheChart(response.data.bpi))
    .catch(error => console.log(error))
}

const printTheChart = bitcoinData => {

    const dates = Object.keys(bitcoinData)
    const values = Object.values(bitcoinData)

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "Bitcoin evolution",
                backgroundColor: '#74b9ff',
                borderColor: "#0984e3",
                data: values,
            }]
        }
    });
};
