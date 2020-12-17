//1-getting the data
const symbolName = 'bpi';
const apiUrl = `https://api.coindesk.com/v1/${symbolName}/historical/close.json`;


axios
.get(apiUrl)
.then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    console.log(responseFromAPI.data)
})
.catch(err => console.log('Error while getting the data: ', err));

//2-Drawing the chart

function printTheChart(data) {

const dailyData = data['bpi'];

const dates = Object.keys(dailyData);
const prices = dates.map(date => dailyData[date]);
const ctx = document.querySelector('#my-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: dates,
    datasets: [
        {
        label: 'Stock Chart',
        borderColor: 'rgb(0,128,0)',
        data: prices
        }
    ]
    }
})}
//iteration 3
document.getElementById('search').addEventListener('submit', event => {

    const startDate = document.getElementsByClassName('start-date').value;
    const endDate = document.getElementsByClassName('end-date').value;
    console.log(startDate);
    console.log(endDate);
   const url = `https://api.coindesk.com/v1/${symbolName}/historical/close.json`;
   console.log ('url', url);
   printTheChart();


});