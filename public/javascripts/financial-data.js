/*const startDate = '2016-12-01'
const endDate = '2017-02-05'*/

function drawChart (xData, yData) {
const ctx = document.getElementById('myChart').getContext('2d');
const  myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xData, // x axis
        datasets: [
            {
            label: 'bitcoin value',
            data: yData, // y axis
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1
            }
        ]
    },
});
}

const selectedStartDate = document.getElementById('start-date')
const selectedEndDate = document.getElementById('end-date')

const filter = document.getElementById('filter')

function showChart() {
    const startDate = selectedStartDate.value;
    const endDate = selectedEndDate.value;
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    axios.get(url)
      .then((response) => {
        console.log(response);
        const xData = Object.keys(response.data.bpi);
        const yData = Object.values(response.data.bpi);
        console.log(xData);
        console.log(yData);
        drawChart(xData, yData);
        })
      .catch((e) => {
        console.log(e);
      });
}

filter.addEventListener('change', event => {
    event.preventDefault()
    showChart()
})
showChart()

