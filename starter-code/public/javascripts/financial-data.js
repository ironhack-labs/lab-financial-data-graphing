const makeInfo = data => {
    dataArray = Object.values(data);
    const min = Math.min.apply(null, dataArray);
    const max = Math.max.apply(null, dataArray);
    const div = document.getElementById('form');
    const div2 = document.createElement('div');
    div2.innerHTML = `<p>Min: ${min}€</p><p>Max: ${max}€</p>`;
    div.appendChild(div2);
};

const getData = () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const currencySelect = document.getElementById('currency');
    const currency = currencySelect.options[currencySelect.selectedIndex].value;
    axios({
        method: 'get',
        url: `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`
    })
    .then(response => {
        console.log(response);
        makeInfo(response.data.bpi);
        printTheChart(response.data);
    })
    .catch(err => {
        console.log(err);
    });
};

const buttonSubmit = document.getElementById('submit');
buttonSubmit.addEventListener('click', getData);

const printTheChart = data => {
    const xAxis = Object.keys(data.bpi);
    const yAxis = Object.values(data.bpi);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data :{
            labels: xAxis,
            datasets: [{
                label: 'Bitcoin Price Index',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxis
            }]
        }
    })
};

