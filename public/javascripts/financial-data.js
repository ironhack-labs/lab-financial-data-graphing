//Fecha del dia actual y del mes anterior mismo dia
const today = new Date().toJSON().slice(0,10).split('-').join ('-')
const month = new Date()
const othermonth = month.getDate() -30
month.setDate(othermonth)
const lastMonth  = month.toJSON().slice(0,10).split('-').join ('-')

//Pasar el mes al value del input
document.querySelector('.endDate').value = today
document.querySelector('.startDate').value = lastMonth

//URL API
const apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json"

//Funcion que pinta el chart
async function showChart(url){
  try{
    const {data} = await axios.get(url);
    const currentBTC = data['bpi'];
    const btcLabels = Object.keys(currentBTC);
    const btcValues = Object.values(currentBTC);
    const ctx = document.querySelector('.my-canvas').getContext('2d');
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: btcLabels,
        datasets: [
          {
            label: "BitCoin Price Index",
            backgroundColor: "rgba(200,200,200,0.7)",
            borderColor: "rgba(0,200,200,0.5)",
            data: btcValues
          },
        ],
      },
    });
    const max = Math.max(...btcValues).toFixed(0)
    const min = Math.min(...btcValues).toFixed(0)
    const currency = document.querySelector('#currency').value
    document.querySelector('#max').textContent = `${max} ${currency}`
    document.querySelector('#min').textContent = `${min} ${currency}`
  
  } catch(e){
    console.error(e)
  }
}
showChart(apiURL)

//Funcion que hace el update del grafico
async function update(){
  try{
  const dateStart = document.querySelector('.startDate').value;
  const dateEnd = document.querySelector('.endDate').value;
  const currency = document.querySelector('#currency').value
  const url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${currency}`
  await showChart(url)
  } catch(e){
    console.error(e)
  }
  }
//EventListener de los input de fecha y moneda
document.querySelector('.endDate').addEventListener('change', update)
document.querySelector('.startDate').addEventListener('change', update)
document.querySelector('#currency').addEventListener('change', update)

