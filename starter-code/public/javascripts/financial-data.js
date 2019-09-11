const ctx = document.querySelector('canvas').getContext('2d')
const start = document.querySelector('#start')
const end = document.querySelector('#end')

//Get day today para el el value por default
let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0') //Enero es 0
let yyyy = today.getFullYear()
today = yyyy + '-' + mm + '-' + dd

//Currency bonus
const currency = document.querySelector('#currency')

const min = document.querySelector('#min')
const max = document.querySelector('#max')
const createGraph = async (startValue, endValue, currency = 'USD') => {
  let bitcoinPrice
  //if para poner valores por default, si no hay startValue no endValue
  if (!startValue && !endValue) {
    bitcoinPrice = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
  } else if (startValue && endValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}&currency=${currency}`
    )
    //se agrega el ? al final del link para indicar que mandaremos querys
    //ej.
    //https://api.coindesk.com/v1/bpi/historical/close.json + ? + querys
  } else if (startValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${today}&currency=${currency}`
    )
  } else if (endValue) {
    bitcoinPrice = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?${endValue}&currency=${currency}`
    )
  }

  //es necesario crear una nueva variable para ingresar a los datos específicos
  //porque sino toma la función de la cual no se ha cumplido la promesa
  //por lo que creamos rawData
  const rawData = bitcoinPrice.data.bpi
  //ver si entramos al especifico
  console.log(rawData)

  //declarar constantes
  const labels = []
  const data = []
  //for para los datos
  for (let key in rawData) {
    labels.push(key)
    //[] trae el valor de la variable
    data.push(rawData[key])
  }

  //Min value
  const minValue = data.reduce((accum, currentValue) => {
    if (accum < currentValue) return accum
    return currentValue
  })
  min.innerHTML = `Min: ${minValue}`
  //Max value
  const maxValue = data.reduce((accum, currentValue) => {
    if (accum > currentValue) return accum
    return currentValue
  })
  max.innerHTML = `Max: ${maxValue}`

  console.log(labels)
  console.log(data)

  const myGraph = new Chart(ctx, {
    type: 'line',
    data: {
      //como la variable se llama data y labels, no es necesario poner el nombre
      labels,
      datasets: [
        {
          label: 'My first data set',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
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

//cada que cambien los valores cambian la gráfica
start.onchange = changeGraphic
end.onchange = changeGraphic
currency.onchange = changeGraphic
