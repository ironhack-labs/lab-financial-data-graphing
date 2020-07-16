axios
  .get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(data => {
    const datas = data.data.bpi
    printTheChart(datas); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));

const dateStart = document.getElementById('date-start')
const dateEnd = document.getElementById('date-end')
const selectCurrent = document.getElementById('select-current')
const spanMinValue = document.getElementById('min-value')
const spanMaxValue = document.getElementById('max-value')
 
function printTheChart(stockData) {
 
  const stockDates = Object.keys(stockData);
  const stockPrices = Object.values(stockData);
    
  const maxValue = Math.max(...stockPrices)
  const minValue = Math.min(...stockPrices)


  spanMinValue.innerText = `${minValue} ${selectCurrent.value}`
  spanMaxValue.innerText = `${maxValue} ${selectCurrent.value}`

  dateStart.setAttribute('value', stockDates[0])
  dateStart.setAttribute('min', stockDates[0])
  dateStart.setAttribute('max', stockDates[stockDates.length - 1])
  dateEnd.setAttribute('min', stockDates[0])
  dateEnd.setAttribute('max', stockDates[stockDates.length - 1])
  dateEnd.setAttribute('value', stockDates[stockDates.length - 1])

 
  const ctx = document.getElementById('my-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgba(205, 205, 205, 0.4)',
          borderColor: 'rgb(205, 205, 205)',
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()


const filterByDate= () => {
    const startDate = dateStart.value
    const endDate = dateEnd.value
    const currentValue = selectCurrent.value
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currentValue}`)
        .then(data => {
            const datas = data.data.bpi
            printTheChart(datas); // <== call the function here where you used to console.log() the response
          })
          .catch(err => console.log('Error while getting the data: ', err));
}


document.querySelectorAll('.change').forEach(element => {
  element.addEventListener('change', event => filterByDate())
})