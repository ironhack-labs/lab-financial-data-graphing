const  start= document.querySelector('#begin')
const  end= document.querySelector('#end')
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')


function update(){
 let startDate = start.value
 let endDate = end.value
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)

  .then((data) => {
    let dates = Object.keys(data.data.bpi)
    let value = Object.values(data.data.bpi)

    var myChart = new Chart(context, {
type: 'line',
data: {
    labels: dates,
    datasets: [{
        label: '',
         data: value,
        borderWidth: 1
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
});
  })
  .catch(error =>  console.log(error))
}
update(start , end)