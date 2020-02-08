const restGraphicalData = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});

const getBitcoinValueHistorical = async() => {
    const data = await restGraphicalData.get()
    const datachida = data.data.bpi;
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(datachida),
            datasets: [{
                label: 'bitcoin',
                data: Object.values(datachida)
            }]
        },

        // Configuration options go here
        options: {}
    });
}

const datesRates = async() => {
    const initialDate = document.getElementById('initialDate');
    const endDate = document.getElementById('endDate');

    const newDataWithDates = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${initialDate.value}&end=${endDate.value}`);
    const data = newDataWithDates.data.bpi;
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'bitcoin',
                data: Object.values(data)
            }]
        },

        // Configuration options go here
        options: {}
    });
}

document.getElementById("getData").onclick = () => {
    getBitcoinValueHistorical();
};