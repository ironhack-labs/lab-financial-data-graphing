

function getDataPrintChart(){
  axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(responseCoin => {
      printChart(responseCoin.data) // Llamo a la función que dibuja la gráfica porque meterlo todo aquí es un lío de la leche
  })
  .catch(err => {
    console.log("Error recibiendo los datos: ", err);
  });
}


// Llamo a getData para que pida los datos y los pinte
getDataPrintChart()


// Pinto la gráfica

function printChart(data) {

const ctx = document.getElementById('myChart').getContext('2d');

const dayData = data["bpi"]; // Los datos están dentro de un objeto llamado bpi fecha:precio
const priceDate = Object.keys(dayData); // Saco la fecha que es la key de cada cosa para usarla de labels
const price = Object.values(dayData); // Saco el precio que es el value de cada cosa para usarla en data

const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: priceDate,
      datasets: [
        {
          label: "BTC",
          backgroundColor: "rgb(68, 166, 199)",
          borderColor: "rgb(103, 199, 68)",
          fill: false,
          data: price
        }
      ]
    }
  }); 
}