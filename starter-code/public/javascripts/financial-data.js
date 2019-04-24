
function getData() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${setDate1()}&end=${setDate2()}&currency=${setCurrency()}`)
  .then(response => {
    console.log(response.data.bpi)
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: '# of Votes',
                data: Object.values(response.data.bpi),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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