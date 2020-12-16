const defualtDaysBack = 31;
let initDate = " ";
let finalDate = " ";
let date1 = new Date();
let date2 = new Date();

let pastDate = date1.getDate() - defualtDaysBack;
date1.setDate(pastDate);
initDate = date1.toISOString().slice(0,10);

let yesterday = date2.getDate() - 1;
date2.setDate(yesterday)
finalDate = date2.toISOString().slice(0, 10);

const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${initDate}&end=${finalDate}`;

// async function getBpiData(apiUrl) {
//     try {
//         const { data: { bpi } } = await axios.get(apiUrl)
//         return bpi;
//     } catch (err) {
//     console.log(err);
//   }
// }

async function bpiChart(apiUrl) {
    try {
        const { data: { bpi } } = await axios.get(apiUrl)
        const canvas = document.querySelector('#bpi-canvas').getContext('2d')
        const dates = Object.keys(bpi)
        const prices = Object.values(bpi)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)
        console.log(maxPrice)
        console.log(minPrice)
        
        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Bitcoin Prices',
                    data: prices,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]

            }
        })

    } catch (err) {
        console.log(err);
      }
}

function updateChart() {
    const { value: startDate } = document.querySelector('#start-date');
    const { value: endDate } = document.querySelector('#end-date');
    const { value: currency } = document.querySelector('#currency');
    const newApiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
    bpiChart(newApiUrl)
}

document.querySelector('#end-date').addEventListener('change', updateChart)
document.querySelector('#start-date').addEventListener('change', updateChart)
document.querySelector('#currency').addEventListener('change', updateChart)

bpiChart(apiUrl)

