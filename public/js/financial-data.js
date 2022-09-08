let minDate = document.getElementById("start");
let maxDate = document.getElementById("end");

let startDate = minDate.value
let endDate = maxDate.value

let graph = null

minDate.addEventListener('input', updateValuestart);
maxDate.addEventListener('input', updateValuesend);

function updateValuestart(date) {
    startDate = date.target.value;
    paint(startDate, endDate)
}

function updateValuesend(date) {
    endDate = date.target.value;
    paint(startDate, endDate)
    console.log('prueba2');
}




function paint(startDate, endDate) {
    axios
        .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then((responseFromAPI) => {
            console.log('The response from API: ', responseFromAPI.data);
            const ctx = document.getElementById('my-chart').getContext('2d');
            if (graph !== null) {
                graph.destroy()
            }
            graph = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Bitcoin Historial',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: responseFromAPI.data.bpi,
                        },
                    ],
                },
            })
        })
        .catch((err) => console.log('Error while getting the data: ', err));
}

paint(startDate, endDate)