

function getData(apiCoindesk){
  axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
      console.log(response.data);
    // Aquí tendría que pintar la grafica
  })
  .catch(err => {
    console.log("Error recibiendo los datos: ", err);
  });
}


// Llamo a getData en la Iteracion #1 para ver por consola que esto chuta pero tiene pinta de que esto se va fuera
getData()