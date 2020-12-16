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
        
        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Bitcoin Prices',
                    data: prices,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]

            }
        })

    } catch (err) {
        console.log(err);
      }
}

document.querySelector('#end-date').addEventListener('change', () => {
    const { value: startDate } = document.querySelector('#start-date');
    const { value: endDate } = document.querySelector('#end-date');
    const newApiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    bpiChart(newApiUrl)
})

bpiChart(apiUrl)

