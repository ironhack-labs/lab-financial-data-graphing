const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const printTheChart = stockData => {
    const dailyData = stockData.bpi;
    console.log({ dailyData });
//This is the data for the x axis:
    const stockDates = Object.keys(dailyData);
    console.log({ stockDates });
    //This is the data for the y axis

    const bitcoinPrice = stockDates.map(date => dailyData[date]);
    console.log(bitcoinPrice);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Bitcoin Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: bitcoinPrice
                }
            ]
        }
    });

};
function changeDate(){
    const userInputStart = document.getElementById('start').value;
    const userInputEnd = document.getElementById('end').value;

    console.log('Startdatum: ', userInputStart);
    console.log('Enddatum: ', userInputEnd);

    axios
.get(`${apiUrl}?start=${userInputStart}&end=${userInputEnd}`)
.then(response => {
    console.log(response.data);
    printTheChart(response.data);
})
.catch(err => {
    console.log('error while getting the data', err);
});
}

function changeCurrency(){
    const currencyState = document.getElementById('currency').value;
    console.log('Währung:' , currencyState);
    axios
.get(`${apiUrl}?currency=${currencyState}`)
.then(response => {
    console.log(response.data);
    printTheChart(response.data);
})
.catch(err => {
    console.log('error while getting the data', err);
});
}

document.getElementById("start").addEventListener('change', changeDate);
document.getElementById("end").addEventListener('change', changeDate);

document.getElementById("currency").addEventListener('change', changeCurrency);



//

axios
.get(apiUrl)
.then(response => {
    console.log(response.data);
    printTheChart(response.data);
})
.catch(err => {
    console.log('error while getting the data', err);
});


