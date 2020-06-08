const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;


document.getElementById('end-date').addEventListener("change", function() {
    var endDate = document.getElementById('end-date').value
    var startDate = document.getElementById('start-date').value
    chart(startDate, endDate)
})

document.getElementById('start-date').addEventListener("change", function() {
    var endDate = document.getElementById('end-date').value
    var startDate = document.getElementById('start-date').value
    chart(startDate, endDate)
})
  
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function chart(date1, date2){
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        var bpi = responseFromAPI.data.bpi;
        var dateArray = Object.keys(bpi)
        var bpiValueArray = Object.values(bpi)

        let date = dateArray.slice(dateArray.indexOf(date1), dateArray.indexOf(date2));
        let bpiValue = bpiValueArray.slice(dateArray.indexOf(date1), dateArray.indexOf(date2));
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {

        type: 'line',
        
        data: {
            labels: date,
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: bpiValue
            }]
        },
        options: {}
        });
    })
    .catch(err => {
        console.log("Error while getting the data: ", err);
    });
}

