document.getElementById("myBtn").addEventListener("click", function(){
    const start = document.getElementById('startInput').value
    const end = document.getElementById('endInput').value  
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    printChart(apiUrl);
});



document.getElementById("currency").addEventListener("change", function () {
    console.log(document.getElementById("currency").value)
    const changeCurrency = document.getElementById("currency").value
    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?function=${changeCurrency}`
    printChart(apiUrl)
});




const printChart = (apiUrl) => {
axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI)
        printTheChart(responseFromAPI.data);
    })
    .catch(err => ('Error occurred while getting the data: ', err));

   function printTheChart(coinData){
    
    const coinDates = Object.keys(coinData.bpi);
    console.log(`COINDATES:,${coinDates}`);

    const coinPrices = Object.values(coinData.bpi)

    const ctx = document.getElementById('myChart').getContext('2d');
    
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: coinDates,
        datasets: [{
            label: 'Bitcoin Price',
            data: coinPrices,
            backgroundColor: 'blue',
            borderColor: 
                'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }

    });
}
}