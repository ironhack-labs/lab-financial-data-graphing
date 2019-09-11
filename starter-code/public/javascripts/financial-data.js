const ctx = document.querySelector('canvas').getContext('2d')
const start = document.querySelector('#start')
const end = document.querySelector('#end')



const createGraph = async (startValue, endValue) => {
  let apiresponse

  if(!startValue && !endValue) {
     apiresponse = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  }
  else if(endValue && startValue){
     apiresponse = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}`)
  }
  
  let data = apiresponse.data.bpi
  const labelsX = []
  const labelsY = []

  for(let key in data) {
    labelsX.push(key)
    labelsY.push(data[key])
  }
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labelsX,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labelsY
        }]
    }

  })
  
  }
  


createGraph()

const changeGraph = () => {
  const startValue = start.value
  const endValue = end.value

  createGraph(startValue,endValue)
}
end.onchange = changeGraph
start.onchange = changeGraph