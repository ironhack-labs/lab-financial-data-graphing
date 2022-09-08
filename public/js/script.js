


document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-financial-data-graphing JS imported successfully!");
  },
  false
  );

let startInput = document.querySelector("#start")
let endInput = document.querySelector("#end")
let maxValue = document.querySelector(".max_value")
let minValue = document.querySelector(".min_value")

const button = document.querySelector('button')

myChart = null;


button.addEventListener('click', () => {
  const startValue = startInput.value;
  const endValue = endInput.value;
  let apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startValue}&end=${endValue}`
  console.log(apiURL)
  if (myChart !== null) {
    myChart.destroy()
  }
  axios.get(apiURL)
  .then(response => {
    console.log(response)
    printChart(response.data)
  })
    .catch(err => console.log(err));
})

function printChart(stockData) {
  const dates = Object.keys(stockData.bpi)
  const closes = dates.map(date => stockData.bpi[date])
  const myCanvas = document.querySelector('#myCanvas').getContext('2d')
  let max = Math.max(...closes)
  let min = Math.min(...closes)
  maxValue.innerHTML = `Max during this range is: ${max}`
  minValue.innerHTML = `Min during this range is: ${min}`
  myChart = new Chart(myCanvas, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
        label: 'Stock Chart',
        backGroundColor: 'rgb(255, 99, 132',
        borderColor: 'rgb(255, 99, 132',
        data: closes
      }
    ]
    }
  })
}


