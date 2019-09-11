const API = 'http://api.coindesk.com/v1/bpi/historical/close.json'
let ctx = document.getElementById('chart').getContext('2d')

function setCharacter(e) {
  const value = Object.values(e.data.bpi)
  const date = Object.keys(e.data.bpi)
  let maxPrice = Math.max(...value)
  let minPrice = Math.min(...value)
  document.getElementById('max-price').innerHTML = maxPrice
  document.getElementById('min-price').innerHTML = minPrice

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: date,
      datasets: [
        {
          label: 'Bitcoin price index',
          backgroundColor: 'rgb(65, 143, 217)',
          borderColor: 'rgb(3, 48, 92)',
          data: value
        }
      ]
    }
  })
}

axios
  .get(API)
  .then(result => {
    setCharacter(result)
  })
  .catch(err => console.log(err))

document.getElementById('submitDate').addEventListener('click', function() {
  const init = document.getElementById('initialDate').value
  const final = document.getElementById('finalDate').value
  let mon = document.getElementById('currency')
  let currency = mon.options[mon.selectedIndex].value
  let urlDate = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${init}&end=${final}&currency=${currency}`

  axios
    .get(urlDate)
    .then(result => {
      setCharacter(result)
    })
    .catch(err => console.log(err))
})
