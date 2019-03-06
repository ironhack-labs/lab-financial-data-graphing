/*jshint esversion: 6 */

const from = document.getElementsByTagName('input')[0]
const to = document.getElementsByTagName('input')[1]
const currency = document.getElementById(`currency`)

today = new Date()
lastMonth = new Date()
lastMonth.setDate(lastMonth.getDate() - 30)
document.getElementById('from').valueAsDate = lastMonth;
document.getElementById('to').valueAsDate = today;

document.addEventListener("DOMContentLoaded", () => print(from, to, currency));
from.addEventListener(`change`, () => print(from, to, currency))
to.addEventListener(`change`, () => print(from, to, currency))
currency.addEventListener(`change`, () => print(from, to, currency))

const print = (from, to, currency) => {

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from.value}&end=${to.value}&currency=${currency.value}`)
        .then(response => {
            printTheChart(response.data.bpi)
        })
        .catch(error => console.log(error));

    const printTheChart = bitcoinData => {

        const bitcoin = []
        const date = []

        for (var key in bitcoinData) {
            date.push(key)
            bitcoin.push(bitcoinData[key])
        }
        const min = Math.min.apply(null, bitcoin)
        const max = Math.max.apply(null, bitcoin)
        document.getElementById('max').innerText = 'Max: ' + max
        document.getElementById('min').innerText = 'Min: ' + min

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    label: "Bitcoin Price Index",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: bitcoin,
                }]
            }
        });
    }
}