const fromInput = document.querySelector("#from")
const toInput = document.querySelector("#to")

let chart = null

const axisValues = bitcoinData => {

  const xAxis = Object.keys(bitcoinData)
  const yAxis = Object.values(bitcoinData)
  
  const ctx = document.querySelector('#canvas').getContext('2d');
  if(chart){
    chart.clear()
    chart.destroy()
  }
  chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: xAxis,
          datasets: [{
              label: "Bitcoin Timeline",
              backgroundColor: '#FABADA',
              borderColor: "#CCCCCC",
              data: yAxis,
          }]
      }
  });
};

const getData = (from, to) => {
  
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
  .then(res => {
      axisValues(res.data.bpi)
      console.log(res.data.bpi)
  })
  .catch(error => console.log(error))
}


fromInput.onchange = () => getData(fromInput.value, toInput.value)
toInput.onchange  = () => getData(fromInput.value, toInput.value)

window.onload = function() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(response => {
      axisValues(response.data.bpi)
      console.log(response.data)
  })
  .catch(error => console.log(error))
}




