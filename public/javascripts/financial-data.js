
  const url = `http://api.coindesk.com/v1/bpi/historical/close.json`

  axios.get(url)
    .then(responseFromApi => {
      console.log(responseFromApi)
    const dailyValue = responseFromApi.data.bpi
    const showData = Object.keys(dailyValue)
    const seperateData = Object.values(dailyValue)
      makeMyChart(showData,seperateData)
    })
    .catch(e => {
      console.log(e)
    })

function makeMyChart(x,y){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: x,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: y
        }]
    },

    // Configuration options go here
    options: {}
});
}

function filterTheDates() {
}

const startDate = document.getElementById('start-date')
const endDate = document.getElementById('end-date')
const submitButton = document.getElementById('date-selector')
const seeAdjustedDateRange= document.getElementById('display-filtered-dates')

submitButton.addEventListener('click', event => {
    event.preventDefault()
    const newUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}`
    axios.get(newUrl)
    .then(response => {
    const dailyValue = response.data.bpi
    const showData = Object.keys(dailyValue)
    const seperateData = Object.values(dailyValue)
      makeMyChart(showData,seperateData)
        console.log(response)
    })
    .catch(e =>{
        console.log(e)
    })
    console.log(startDate.value,endDate.value)
  })