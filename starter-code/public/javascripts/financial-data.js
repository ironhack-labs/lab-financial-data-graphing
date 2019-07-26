// Make a request for a user with a given ID
var createGraph = function(){
    const chart = document.getElementById("chartBox");
    while (chart.firstChild) {
        chart.firstChild.remove();
    }
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}&currency=${selectedCurrency.value}`)
  .then(function (response) {
    // handle success
    const date = Object.keys(response.data.bpi);
    const values = Object.values(response.data.bpi);
    var xLabels = Object.values(date);
    var canv = document.createElement("canvas");
    canv.id = 'myChart';
    document.getElementById("chartBox").appendChild(canv);
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xLabels,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: values,
            backgroundColor: '#eee',
            borderColor: '#A9A9A9',
            borderWidth: 1
        }]
    }
    });
    document.getElementsByClassName("currency")[0].innerHTML = selectedCurrency.value;
    document.getElementsByClassName("currency")[1].innerHTML = selectedCurrency.value;
    document.getElementById("maxVal").innerHTML = Math.max(...values).toFixed(2);
    document.getElementById("minVal").innerHTML = Math.min(...values).toFixed(2);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

createGraph()

document.getElementById("startDate").addEventListener("change", function(){createGraph()})
document.getElementById("endDate").addEventListener("change", function(){createGraph()})
document.getElementById("selectedCurrency").addEventListener("click", function(){createGraph()})