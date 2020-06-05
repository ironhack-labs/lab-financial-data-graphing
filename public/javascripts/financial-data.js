//EVENT LISTENERS
window.addEventListener('load', (event) => {
    checkBtcPrice();
});

const dates = document.querySelectorAll('input')
dates.forEach(elem => elem.addEventListener('input', () => {
    checkBtcPrice()
}))

const currency = document.querySelector('select#currencyCode')
currency.addEventListener('change', () => {
    checkBtcPrice()
})


//FUNCIONES

//FUNCION PARA IMPRIMIR EL CHART
function printTheChart(bpiData) {  
    const bpiDate = Object.keys(bpiData);
    const bpiValues = Object.values(bpiData)
    const ctx = document.querySelector('canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
                labels: bpiDate,
            datasets: [{
            label: 'Bitcoin Price',
            backgroundColor: 'rgba(10, 70, 90, .4)',
            borderColor: 'rgb(25, 99, 132)',
            data: bpiValues
            }]
        }
    })}


//FUNCION PARA ACTUALIZAR LOS VALORES MAX Y MIN EN PANTALLA
function showValues(pricesArr){
    const maxV = document.getElementById('maxValue');
    const minV = document.getElementById('minValue');
    const currency = document.querySelector('select#currencyCode').value
    maxV.innerHTML = `${Math.max(...pricesArr)} ${currency}`
    minV.innerHTML = `${Math.min(...pricesArr)} ${currency}`
}

        

//FUNCION PRINCIPAL QUE BUSCA LA INFORMACION
function checkBtcPrice () {
    const fromDate = document.querySelector('#fromDate').value
    const toDate = document.querySelector('#toDate').value
    const currency = document.querySelector('select#currencyCode').value
    let apiUrl = "";
    if (fromDate === "" || toDate === ""){
        apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
    } else {
        apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    }
    axios
    .get(apiUrl)
    .then(({ data: {bpi}}) => {
        printTheChart(bpi);
        const prices = Array.from(Object.values(bpi));
        showValues(prices);
    })
    .catch(err => console.log('Error while getting the data: ', err));
}

         

