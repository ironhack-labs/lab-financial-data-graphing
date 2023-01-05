const ctx = document.getElementById('myChart');

const printChart = (startDate, endDate, currency) => {

    // if (!startDate) { startDate = '2020-09-01' }
    // if (!endDate) { endDate = '2020-09-05' }

    const coindeskParams = {
        currency: currency,
        start: startDate,
        end: endDate
    }

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${coindeskParams.start}&end=${coindeskParams.end}&currency=${coindeskParams.currency}`)
    .then(response => {
        
        const labels = Object.keys(response.data.bpi);
        const datapoints = Object.values(response.data.bpi);

        const data = {
        labels: labels,
        datasets: [
            {
            label: `Historical BPI data (start: ${coindeskParams.start} / end: ${coindeskParams.end} / currency: ${coindeskParams.currency})`,
            data: datapoints,
            borderColor: 'red',
            fill: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
            }
        ]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
            responsive: true,
            plugins: {
                title: {
                display: true
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                display: true,
                title: {
                    display: true
                }
                },
                y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                suggestedMin: -10,
                suggestedMax: 200
                }
            }
            }
        });

        const infoboxEl = document.getElementById('infobox');
        infoboxEl.innerHTML = `Minimum value: <b>${Math.min(...datapoints)}</b><br/>Minimum value: <b>${Math.max(...datapoints)}</b>`;
        
    })
    .catch(err => console.log(err));

}