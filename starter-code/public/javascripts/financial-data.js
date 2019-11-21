const ctx = document.querySelector('canvas').getContext('2d')
const start = document.querySelector('#start')
const end = document.querySelector('#end')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

let date = new Date()
let dd = String(date.getDate()).padStart(2, '0')
let mm = String(date.getMonth() + 1).padStart(2, '0') 
let yyyy = date.getFullYear()
date = yyyy + '-' + mm + '-' + dd

const currency = document.querySelector('#currency')

const createGraph = async (startValue='', endValue='', currency = 'USD') => {
  let sVal = (startValue==='') ? '' : `?start=${startValue}`;
  let eVal = (endValue==='') ? '' : `&end=${endValue}`; 
  let cVal = (currency ==='') ? '' : `?currency=${currency}`;
  let url = `https://api.coindesk.com/v1/bpi/historical/close.json${sVal}${eVal}${cVal}`;
  let bitcoinPrice = await axios.get(url);
  const {data:{bpi}} = bitcoinPrice;
  const labels = []
  const data = []
  for (let key in bpi) {
    labels.push(key)
    data.push(bpi[key])
  }
  //Draw Max and Min values in the front
  const values = data.sort((a,b)=> a-b);
  max.innerHTML= `MAX: ${values[0]} ${currency}`;
  min.innerHTML= `MIN: ${values[data.length-1]} ${currency}`;
  //create new chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Bitcoin Price Index',
          data
        }
      ]
    }
  })
}

createGraph()

const changeGraphic = () => {
  const startValue = start.value
  const endValue = end.value
  const currencyValue = currency.value

  createGraph(startValue, endValue, currencyValue)
}

start.onchange = changeGraphic
end.onchange = changeGraphic
currency.onchange = changeGraphic