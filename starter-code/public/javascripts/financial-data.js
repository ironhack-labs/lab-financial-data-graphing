var myData;
var dataArray = [];
var labelsArray = [];
var minDate;
var maxDate;
var ctx = document.getElementById("myChart").getContext('2d');
var minimum = document.getElementById('min-date').value;
var maximum = document.getElementById('max-date').value;

axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(response => {
    myData = response.data.bpi;
    for(key in myData){
        labelsArray.push(key);
        dataArray.push(myData[key]);
    }
    drawChart(myData, labelsArray, dataArray);
})
.catch(error => {
    console.log(error);
})
document.getElementById('min-date').onchange = function(e){
    console.log(this.value);
    drawChart(myData, labelsArray, dataArray, this.value, maximum);
}
document.getElementById('max-date').onchange = function(e){
    console.log(this.value);
    drawChart(myData, labelsArray, dataArray, minimum, this.value);
}
function drawChart(myData, labelsArray, dataArray, minimumD="", maximumD=""){
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsArray,
            datasets: [{
                label: 'Price',
                data: dataArray,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        min: minimumD,
                        max: maximumD
                    }
                }]
            }
        }
    })
}