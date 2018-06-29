const financeApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});

const ctx = document.getElementById('chart').getContext('2d');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const currency = document.getElementById('currency');
const min = document.getElementById('min');
const max = document.getElementById('max');
const btn = document.getElementById('btn');

function getFinanceInfo(){
    financeApi.get()
        .then(response => {
            console.log(response);
            createChart(response.data.bpi)
        })
        .catch(err => {
            console.log('Tryna be rich huh?: ', err);
            next();
        })
}

// Had to put onclick function in HTML had some issues implementing it through javascript 
let updateDate = (/* start, end */) => {
    let start  = startDate.value;
    let end = endDate.value;
    let finance = axios.create({
        baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=` + start + '&end=' + end
    });
    finance.get()
        .then(response => {
            createChart(response.data.bpi);
            console.log(base)
        })
        .catch(err => {
            console.log('Ending a first date hurts more than never getting one:', err);
            // next();
        });
};

let updateCurrency = () => {
    let money = currency.value;
    let finance = axios.create({
        baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json?currency=' + money
    });
    finance.get()
        .then(response => {
            createChart(response.data.bpi);
        })
        .catch(err => {
            console.log('Gantt Chart?: ', err);
        });
};

function createChart(data){
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: "Bitcoins",
                data: Object.values(data)
            }]
        }
    });
    maxMin(data);
}

let maxMin = (data) => {
    let values = Object.values(data);
    console.log(data);
    console.log(values);
    min.innerText = Math.floor(Math.min(...values)) + ' ' + currency.value;
    max.innerText = Math.floor(Math.max(...values)) + ' ' + currency.value;
}

getFinanceInfo();