const api = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi',
});

const fetchHistoricalData = async (start, end, currency) => {

    start = start === '' ? "2020-05-01" : start
    end = end === '' ? "2020-06-01" : end



    try {
        const { data } = await api.get(`/historical/close.json?start=${start}&end=${end}&currency=${currency}`);
        return data
    } catch (error) {
        console.error(error);
    }
}


const getHistoricalData = async (start, end, currency) => {
    const result = await fetchHistoricalData(start, end, currency)
    return result
}

const printChart = async () => {

    const ctx = document.getElementById('myChart').getContext('2d');


    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const currency = document.getElementById('currency').value;

    const data = await fetchHistoricalData(dateFrom, dateTo, currency)
    //data for x
    const timeData = Object.keys(data.bpi)
    //data for y
    const biticoinValue = Object.values(data.bpi)

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Biticoin Price Index',
                data: biticoinValue,
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}
printChart()