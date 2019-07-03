const canvas=document.querySelector("#dataCanvas")
const ctx = canvas.getContext('2d')
const dateIn= document.querySelector('#dateStart').value
const dateFin= document.querySelector('#dateEnd').value
function changeDate (dateIn,dateFin){
  dateIn=document.querySelector('#dateStart').value
  dateFin=document.querySelector('#dateEnd').value

axios.get((`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateIn}&end=${dateFin}`))
.then(({data})=>{
  const arrData = Object.values(data.bpi)
  const arrKeys = Object.keys(data.bpi)
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrKeys,
        datasets: [{
            label: '# of Votes',
            data: arrData,
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
})
}).catch(err=>console.log(err))
}

changeDate()