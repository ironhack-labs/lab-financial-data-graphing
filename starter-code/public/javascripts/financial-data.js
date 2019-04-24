const minValue = document.getElementById('min-value')
const maxValue = document.getElementById('max-value')


function getData() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${setDate1()}&end=${setDate2()}&currency=${setCurrency()}`)
  .then(response => {
    let min = Math.min(...Object.values(response.data.bpi)).toFixed(2)
    let max = Math.max(...Object.values(response.data.bpi)).toFixed(2) 
    minValue.innerHTML = `Min: ${min}`
    maxValue.innerHTML = `Max: ${max}`

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: 'Bitcoin Historic Price',
                data: Object.values(response.data.bpi),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: Math.min(Object.values(response.data.bpi))
                    }
                }]
            }
        }
    })
    //minValue.innerText = Math.min(valuesArr).toString()
  })
  .catch(err => console.log(err)) 
}

const button = document.getElementById('get-data')
button.addEventListener('click', getData)

const firstDate = document.getElementById('first-date')
firstDate.addEventListener('change', setDate1)

const lastDate = document.getElementById('last-date')
lastDate.addEventListener('change', setDate2)

const currency = document.getElementById('currency')
currency.addEventListener('change', setCurrency)

//const minValue = document.getElementById('min-value')
//minValue.innerHTML = String(Math.min(Object.values(response.data.bpi)))


function setDate1() {
  let date1 = firstDate.value
  if (date1 === '') return '2019-01-01'
  return date1
}

function setDate2() {
  let date2 = lastDate.value
  if (date2 === '') return '2019-01-20'
  return date2
}

function setCurrency() {
  let cur = currency.value
  return cur
}

function getMax(arr) {
  let num = Math.min(Object.values(arr.data.bpi))
  return num 
}