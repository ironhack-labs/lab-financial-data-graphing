const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"


const getDataI = (apiUrl) => { //cree una función para llamarla abajo cuando buscaramos las fechas y el currency 
    axios
        .get(apiUrl)
        .then((response) => {
            //console.log(response.data);
            const { data } = response;
            const xAxis = Object.keys(data.bpi);
            const yAxis = Object.values(data.bpi);
            paintData(xAxis, yAxis)

        })
        .catch(err => console.log('Error while getting the data: ', err))
}

/*axios.get(apiUrl)
.then((response) => {
        //console.log(response.data);
        const { data } = response;
        const xAxis = Object.keys(data["bpi"]);
        const yAxis = Object.values(data["bpi"]);
        paintData(xAxis, yAxis)

    })
    .catch(err => console.log('Error while getting the data: ', err))*/ //esto fue lo que vos hiciste y que yo convertí en función
//arriba para que nos sirviera



const paintData = (xAxis, yAxis) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label: 'Bitcoin Price Index',
                borderColor: 'turquoise'
            }]

        }
    })
}

getDataI(apiUrl)
    // para buscar las fechas hay que tocar el DOM. buscamos por element by ID y le decimos que cuenado le demos click
    //nos de el valor que le pedimos en este caso startvalue y endvalue. Luego en la documentación dice cómo buscar por fechas
    // que es agregando esto al final de la apiurl ?start=${from}&end=${to}`
    //usamos la función que creamos arriba y llamamos a la nueva url en este caso la meti en un const q se llama datesfilter

document.getElementById('getValueBtn').addEventListener('click', () => {
        const from = document.getElementById("startValue").value
        const to = document.getElementById("endValue").value;
        const datesFilter = `${apiUrl}?start=${from}&end=${to}`
        getDataI(datesFilter)

    })
    //lo mismo que arriba, pero esta vez se le agrega a la url &currency=${currency} también está en la docu

document.getElementById('currency').addEventListener('input', () => {
    const currency = document.getElementById('currency').value
    const startDate = document.getElementById('startValue').value
    const endDate = document.getElementById('endValue').value
    const currencyUrl = `${apiUrl}?start=${startDate}&end=${endDate}&currency=${currency}`
    getDataI(currencyUrl)
})