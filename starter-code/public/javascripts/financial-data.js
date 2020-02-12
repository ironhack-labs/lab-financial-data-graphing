document.getElementById("button").onclick = () => {
    const iDate = document.getElementById("fromDate").value
    const tDate = document.getElementById("toDate").value
    const curren = document.getElementById("currency").value
    console.log(iDate)
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
    .then(response => printChart(response.data.bpi))
    .catch(error => console.log(`error:${error}`))
   
}

// const data = async () => {
//     try {
//         const response = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json');
//         console.log(response.data.bpi); //se ve en la consola del navegador
//         printChart(response.data.bpi);//para pasarlo a la funcion que pintará el chart
//         // const bpi = response.data.bpi;
//         // document.getElementById('value').innerText = bpi; //pasamos "value" para poderla llamar desde index
//     } catch (error){
//         console.log(error)
//     }
// }

// data();

function printChart(info){ //funcion para pintar el chart
    const dates = Object.keys(info);
    console.log(dates);
    const price = Object.values(info)
    console.log(price);

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgba(0, 0, 0,.6)",
                borderColor: "rgb(0, 255, 182)",
                data: price
            }]
        }
    })
}
