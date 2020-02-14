// variable para que cuando entre en la funcion solo le cargue los datos
let myChart

document.getElementById("button").onclick = () => {
    const iDate = document.getElementById("fromDate").value
    const tDate = document.getElementById("toDate").value
    const curren = document.getElementById("currency").value
    const curren1 = document.getElementById("currency").value

    document.getElementById("curren").innerText = curren //pasamos "curren" para poderla llamar desde index
    document.getElementById("curren1").innerText = curren1//no entiendo porque hay que hacer esto para que salga en otra linea
    console.log(iDate)//se ve en la consola del navegador
    console.log(tDate)
    if(iDate && tDate){
        data(iDate, tDate, curren)
    }
}

function data(iDate, tDate, curren){
    const urlApi = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${iDate}&end=${tDate}&currency=${curren}`;
    console.log(urlApi)
    axios
    .get(urlApi)
    .then(response => printChart(response.data.bpi))//para pasarlo a la funcion que pintará el chart
    .catch(error => console.log(`error:${error}`))
}

function printChart(info){ //funcion para pintar el chart
    const dates = Object.keys(info);
    console.log(dates);
    const price = Object.values(info)
    console.log(price);

    let minValue = Math.min(...price)
    console.log("este es el minimo",minValue)
    document.getElementById("minValue").innerText = minValue //pasamos "curren" para poderla llamar desde index
    let maxValue = Math.max(...price)
    console.log(maxValue)
    document.getElementById("maxValue").innerText = maxValue

    const ctx = document.getElementById("canvasChart").getContext("2d");
    if(!myChart){
    myChart =  new Chart(ctx, { //no la definimos aqui porque si no cada vez que salga de la funcion perderiamos la variable y crearia una nueva cada vez que entre
        type: "line",
        data: {
        labels: dates,
        datasets:[{
            label: "Graphic Bit Coin",
            backgroundColor: "rgba(0, 0, 0,.6)",
            borderColor: "rgb(0, 255, 182)",
            data: price
        }]
        }
    })
} else {
    //para poder utilizar el update hay que poner previamente los datos que queremos actualizar. Importante el datasets[0]
    myChart.data.labels = dates
    myChart.data.datasets[0].data = price
    myChart.update()
}
console.log(myChart)
}

