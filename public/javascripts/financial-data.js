
let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios
.get(apiUrl)
.then(responseFromAPI => {
    printTheChart(responseFromAPI.data);

})
.catch(err => console.log('Error while getting the data: ', err));

function printTheChart(bitcoinData) {
    const dailyData = bitcoinData.bpi;
  
    const dates = Object.keys(dailyData);
    const prices = dates.map(date => dailyData[date]);
  
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Bitcoin Price Index',
            backgroundColor: 'rgba(179, 179, 179, 0.5)',
            borderColor: 'rgb(179, 179, 179)',
            data: prices
          }
        ]
      }
    });
  }

let from = document.getElementById('from')
let to = document.getElementById('to')

function range () {
    let fromValue = from.value
    let toValue = to.value

    return [fromValue, toValue]
}
let rangeValues
let rangeStr = ""
from.addEventListener("change", function () {
    rangeValues = range()
    console.log(rangeValues)
    
    if (rangeValues[1] !== "") {
        rangeStr  = `?start=${rangeValues[0]}&end=${rangeValues[1]}`
    }
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json${rangeStr}`;
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data);

    })
    .catch(err => console.log('Error while getting the data: ', err)); 
    
})

to.addEventListener("change", function () {
    rangeValues = range()
    console.log(rangeValues)
    if (rangeValues[0] !== "") {
        rangeStr  = `?start=${rangeValues[0]}&end=${rangeValues[1]}`
    }
    apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json${rangeStr}`;
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data);

    })
    .catch(err => console.log('Error while getting the data: ', err)); 
   
})






