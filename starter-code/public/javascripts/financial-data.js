const ctx = document.getElementById('myChart').getContext('2d')
const startDate = document.querySelector("#startDate")
const endDate = document.querySelector("#endDate")
let data = []
let labels = []



const createChart = async (startDate = "", endDate = "") => {
  let firstValue = (startDate==='') ? '' : `?start=${startDate}`;
  let lastValue = (endDate==='') ? '' : `&end=${endDate}`; 
  let bitcoinPrice = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json${firstValue}${lastValue}`);
  const {data:{bpi}} = bitcoinPrice;
  data = []
  labels = []
  for(key in bpi){
      labels.push(key)
      data.push(bpi[key])
  }
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Bitcoin Price Index',
            data: data,
            }]
        }
    })
}

createChart()

const changeChart = async () => {
    await createChart(startDate.value, endDate.value)
}

startDate.onchange = changeChart
endDate.onchange = changeChart