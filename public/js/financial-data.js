const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

const printChart = bitcoinData => {
    const dailyData = bitcoinData['bpi']
    console.log(dailyData);
}

axios.get(apiUrl)
.then(response => {
    console.log(response.data);
    printChart(response.data);
})
.catch(err => {
    console.log(err);
})