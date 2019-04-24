/*1. Se hace función data y dentro de esta se tiene que llamar a la 
API de axios. 
2. Como es una promesa, se debe hacer un .then que "llame" a los valores 
que existen en la API. Estos valores vienen en response. 
3. Como dichos valores vienen en response, se debe realizar aquí la 
gráfica. Estos valores se encuentran dentro de un objeto con keys y values. 
4. En esta gráfica, debemos llamar a dichos objetos. El primero keys y con este llamar
al resultado en data.bpi = fechas
5. En datasets es la data en sí, los valores, por lo tanto se mete el objeto-valor, llamando igual 
a data.bpi
6. Se hace un eventListener para que ejecute la función, en este caso
el botón. 
7. Se hacen los labels e inputs de fechas en el index. Y se les llama aquí con 
el document.getElementbyId. Asímismo, se hace el select de currency. 
8. Se hacen las funciones para las fechas y en currency, dentro de estas se setea una variable 
que va a retornar el valor del document.getElement... */ 

function data() {

axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate()}&end=${secondDate()}&currency=${setCurrency()}`)
.then(response => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: '# of votes',
                data: Object.values(response.data.bpi),
                backgroundColor: [
                    'rgba(255, 99, 123, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 123, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: Math.min(Object.values(response.data.bpi))
                    }
                }]
            }
        }
    });
})
.catch(err => console.log(err))

} 
const button = document.getElementById("go!") 
button.addEventListener("click", data)

const dateOne = document.getElementById('bd')
dateOne.addEventListener("change", firstDate)

const dateTwo = document.getElementById('ed')
dateTwo.addEventListener("change", secondDate)

const currency = document.getElementById("currency")
currency.addEventListener("change", setCurrency)

function firstDate() {
    let date1 = dateOne.value
    return date1 === '' ? '2019-04-01' : date1
}

function secondDate() {
    let date2 = dateTwo.value
    return date2 === '' ? '2019-04-20' : date2
}

function setCurrency() {
    let curr = currency.value
    return curr
}

