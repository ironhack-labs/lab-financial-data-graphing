var ctx = document.getElementById("myChart").getContext("2d");
var myChart;

var startInput = document.getElementById('start')
var endInput = document.getElementById('end')
var currencyInput = document.getElementById('currency')

var labelMax = document.getElementById('maxValue')
var labelMin = document.getElementById('minValue')

const createChart = (labels, values) => {
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
            {
                label: "Bitcoin Price Index",
                data: values,
                backgroundColor: [
                "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1
            }
            ]
        },
    });
}

const updateChart = (labels, values) => {
    removeChartData();

    for(let i = 0; i < labels.length; i++){
        myChart.data.labels.push(labels[i]);
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(values[i]);
        });
    }

    myChart.update();
}

const removeChartData = () => {
    while(myChart.data.labels.length > 0){
        myChart.data.labels.pop();
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
    }
}

const pickValues = data => {
  let values = [];
  for (const prop in data) {
    values.push(data[prop]);
  }
  return values;
};

const updateEvent = () => {
    var startValue = startInput.value
    var endValue = endInput.value
    var currency = currencyInput.value

    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}&currency=${currency}`
    axios.get(url)
    .then(res => {
        let datos = res.data.bpi;

        let labels = Object.keys(datos);
        let values = pickValues(datos);

        labelMax.innerHTML = Math.max(...values).toFixed(2) + " - " + currency;
        labelMin.innerHTML = Math.min(...values).toFixed(2) + " - " + currency;

        updateChart(labels, values);
    })
    .catch(err => console.log(err))
}

startInput.addEventListener('change', updateEvent)
endInput.addEventListener('change', updateEvent)
currencyInput.addEventListener('change', updateEvent)

window.addEventListener('load', () => {
    var startValue = startInput.value
    var endValue = endInput.value
    var currency = currencyInput.value

    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}&currency=${currency}`
    axios.get(url)
    .then(res => {
        let datos = res.data.bpi;

        let labels = Object.keys(datos);
        let values = pickValues(datos);

        labelMax.innerHTML = Math.max(...values).toFixed(2) + " - " + currency;
        labelMin.innerHTML = Math.min(...values).toFixed(2) + " - " + currency;

        createChart(labels, values);
    })
    .catch(err => console.log(err))
})