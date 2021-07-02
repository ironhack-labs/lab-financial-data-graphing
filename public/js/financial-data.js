
const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
//Peticion a Axios para hacer peticiones HTTP que nos devuelve promesas
axios.get(apiUrl)
  .then((responseFromAPI) => {
    //console.log(response.data)
    console.log('The response from API: ', responseFromAPI)
    printTheChart(responseFromAPI.data)
    // //Borrar el "Loading..." con manipulacion del DOM
    document.querySelector('p').remove()
    //Crear un title
    const title = document.createElement('h1')
    title.textContent = "Chart"
    // //Crear un unorderer list
    // const list = document.createElement('ul')
    // document.body.append(list)
    // //Crear una tag li con el valor del bitcoin
    // Object.values(response.data.bpi).forEach(date => {
    //   const item = document.createElement('li')
    //   //Valor del bitcoin en funcion de la fecha
    //   item.textContent = date
    //   list.append(item)
    // });
  })
  .catch(e => console.error(e))
//CREAR FUNCION PARA PINTAR LA GRAFICA
function printTheChart(stockData) {
  const dailyData = stockData['bpi'];
  //Almacena en la variable stockDates las keys del objeto que colocara en el eje X de la grafica
  const stockDates = Object.keys(dailyData);
  //const stockPrices = stockDates.map(date => dailyData[date]);
  const stockPrices = Object.values(dailyData)

  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Bitcoin Price Index (BPI)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()

