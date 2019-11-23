const getData = async (startdate, endate, currency) => {
    if (startdate){
        const vars  = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?index=[${currency}/CNY]?start=${startdate}&end=${endate}`)
    } else {const vars = await axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")}
    var ctx = document.querySelector('#myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(vars['data'].bpi),
            datasets: [{
                label: 'Btc Value',
                data: Object.values(vars['data'].bpi),
            }]
        }
});
}

document.getElementById("submit-dates").addEventListener("submit",
    getData( document.querySelector('#start-date').value, 
            document.querySelector('#end-date').value ),
            document.querySelector('#currency').value )