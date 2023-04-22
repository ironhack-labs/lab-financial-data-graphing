
const startDate = document.querySelector(".startDate")
const endDate = document.querySelector(".endDate")
const currency= document.querySelector(".currency")

const button = document.querySelector("button")
let compteur = 0;

button.addEventListener("click", () => {
    console.log("StartDate =", startDate,"StartDate value =", startDate.value);
    console.log("EndDate =", endDate,"EndDate value =", endDate.value);
    compteur +=1
    if(compteur > 1){
        chart.destroy()
    }
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}&currency=${currency.value}`)
    .then(responseFromApi => {
     printTheChart(responseFromApi)
    })
    .catch(error => console.log("Stg went wrong",error))
})


function printTheChart(stockData){
    const values = stockData.data.bpi
    console.log(values)
    const dates = Object.keys(values);
    const prices = dates.map(date => values[date]);
    const ctx = document.querySelector('#myChart')

    chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: '# of Votes',
            data: prices,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    window.chart = chart
    console.log('chart=', chart)
}




