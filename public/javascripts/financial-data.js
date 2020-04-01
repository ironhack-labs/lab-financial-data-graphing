console.log('seba');

let firstDay = '';
document.getElementById('firstDay').onchange = (event) => {
    firstDay = event.target.value;
    updateChart();
}

let lastDay = '';
document.getElementById('lastDay').onchange = (event) => {
    lastDay = event.target.value;
    updateChart();
}

let currency = 'USD';
document.getElementById('currency').addEventListener('change', (event) => {
    currency = event.target.value;
    updateChart();
})


const minValueTag = document.getElementById('minValue');
const maxValueTag = document.getElementById('maxValue');


const updateChart = () => {
    if (firstDay !== '' && lastDay !== '') {
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDay}&end=${lastDay}&currency=${currency}`)
            .then(response => {
                console.log(response.data.bpi);
                console.log(Object.keys(response.data.bpi));
                printTheChart(response.data.bpi);
            }) 
            .catch(error => console.log(error));
    }
}



const printTheChart = (stockData) => {
    const dailyData = stockData;

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => {
        return dailyData[date];
    });


    minValueTag.innerHTML = 'Min: '+ Math.min(...stockPrices).toString();
    maxValueTag.innerHTML = 'Max: '+ Math.max(...stockPrices).toString();


    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Bitcoin Price Index",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    });
}

