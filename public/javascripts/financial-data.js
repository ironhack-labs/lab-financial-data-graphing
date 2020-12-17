const symbolName = 'bpi';
const apiUrl = `https://api.coindesk.com/v1/${symbolName}/historical/close.json`;
 
axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
    console.log(responseFromAPI.data)
  })
  .catch(err => console.log('Error while getting the data: ', err));

function printTheChart(stockData) {
  const dailyData = stockData['bpi'];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]);

  const ctx = document.querySelector('.grap').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices
        }
      ]
    }
  })
} 
async function getDataInfo(stockData) {
    try{
        const startDate = document.querySelector('#date-start').value;
        const endDate = document.querySelector('#date-end').value;
        console.log("before await")

        const dailyData = stockData['time'];
        const stockDates = Object.keys(dailyData);
        const stockPrices = stockDates.find(date => dailyData[date]);

        const{
            data: [bpi],
        } = await axios.get(`/?start=${startDate}&end=${endDate}`);

        console.log("dates", {stockPrices})
    }catch(err){
        console.error(err);
    }
}
const stockBtn = document.querySelector('.btn');
stockBtn.addEventListener("click", () =>{
    const startDate = document.querySelector('#date-start').value;
    const endDate = document.querySelector('#date-end').value;
    const dates = startDate && endDate;
    getDataInfo(dates)})
