
const drawCharts = (lab,val) =>{
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: "line",
      data: {
        labels: lab,
        datasets: [{
          backgroundColor: "rgb(255, 99, 132)",
          label:"Stock chart",
          data: val
        }]
      }
    }) 
    };


let labels = "";
let values = "";
let startDate = document.getElementById('fromdate').value;
let endDate = document.getElementById('todate').value;
// let currency = document.getElementById('currency').value;
// let exchangeRate = 1;

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response =>{
    labels = Object.keys(response.data.bpi);
    values = Object.values(response.data.bpi);
drawCharts(labels,values);
        })

document.getElementById("currency").onchange = () =>{
        currency = document.getElementById('currency').value;
        getFilterAndData();
}

const getFilterAndData = () => {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(response =>{
        
        labels = Object.keys(response.data.bpi);
        values = Object.values(response.data.bpi);
        drawCharts(labels,values);
        })
        }

document.getElementById("todate").onclick = () =>{
        endDate = document.getElementById('todate').value;
        getFilterAndData();
    }

document.getElementById("fromdate").onclick = () =>{
    startDate = document.getElementById('fromdate').value;
    getFilterAndData();
}

// change here everything and incorporate into getFilterAndData
const changeCurrency = () => {
        currency = document.getElementById('currency').value;
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        .then(response =>{
            console.log(currency);
            console.log(response.data.bpi.currency.rate_float);
            console.log(response.data.bpi.USD.rate_float);
            exchangerate = (response.data.bpi.currency.rate_float) / (response.data.bpi.USD.rate_float)
            console.log(exchangerate);
            console.log(values);
            let valuesNew = values.map(el => {
                return Number(el) * exchangerate;
            })
                //return values;
            console.log(valuesNew);
           
            })
        }
