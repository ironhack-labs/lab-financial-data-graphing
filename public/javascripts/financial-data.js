const url = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const chart = document.getElementById('myChart');
const inputFrom = document.getElementById('fromDate');
const inputTo = document.getElementById('toDate');
const selectCur = document.getElementById('currency');
const maxValue = document.getElementById('maxValue');
const minValue = document.getElementById('minValue'); 

let startDate = "";
let endDate = ""; 
let currency = 'USD';

async function getBitcoinData(url) {
  try {

    if (startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}&currency=${currency}`;
    } else {
      url += `?currency=${currency}`; 
    }

    const res = await axios.get(url); 

    const labels = Object.keys(res.data.bpi)
    const values = Object.values(res.data.bpi);

    const myChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: 'Bitcoin Price Index',
            backgroundColor: 'rgb(230, 230, 230)',
            borderColor: 'rgb(180, 180, 180)',
            data: values
        }]
      },
      options: {}
    })

    const maxData = Math.max(...values);
    const minData = Math.min(...values); 

    maxValue.innerText = `${maxData} ${currency}`;
    minValue.innerText = `${minData} ${currency}`;
      
  } catch (error) {
    console.log(error); 
  }
}

getBitcoinData(url);

inputFrom.addEventListener('input', (e) => {
  startDate = e.target.value; 
  getBitcoinData(url);
})

inputTo.addEventListener('input', (e) => {
  endDate = e.target.value; 
  getBitcoinData(url);
})

selectCur.addEventListener('change', (e) => {
  currency = e.target.value; 
  getBitcoinData(url);
})