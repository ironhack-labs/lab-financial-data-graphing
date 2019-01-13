// get default view
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?`)
      .then(res => {
      
          let dates = Object.keys(res.data.bpi)
          let prices = Object.values(res.data.bpi)

          createChart(dates, prices)

      }).catch(err => {console.log(err)})


// create Chart Function
function createChart(label, data) { 

const ctx = document.getElementById('myChart').getContext('2d');
      
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: label,
    datasets: [{
      label: "Stock Chart",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: data,
    }]
  }
});
}


// add event listeners to date selection
document.getElementById("von").addEventListener("change", loadGraph)
document.getElementById("bis").addEventListener("change", loadGraph)

// callback function
function loadGraph() {

  let von = document.getElementById("von").value
  let bis = document.getElementById("bis").value  

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${von}&end=${bis}`)
  .then(res => {
    
    let dates = Object.keys(res.data.bpi)
    let prices = Object.values(res.data.bpi)

    createChart(dates, prices)

})}