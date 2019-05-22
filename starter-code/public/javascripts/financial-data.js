const start = document.getElementById("start")
const end = document.getElementById("end")
let startDate 
let endDate

start.addEventListener("change", function(){
  console.log(start.value)
  startDate = start.value
  printTheChart(getCoinDeskInfo())
});

end.addEventListener("change", function(){
  endDate = end.value
  printTheChart(getCoinDeskInfo())
});

const coinDeskAPI = axios.create({
  baseURL: `http://api.coindesk.com/v1/bpi/historical`
});
// const coinDeskAPI = axios.create({
//   baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
// });



function getCoinDeskInfo() {
  console.log(endDate)
  return coinDeskAPI.get(`/close.json?start=${startDate}&end=${endDate}`)
  .then(responseFromAPI => {

      console.log(responseFromAPI.data.bpi)
      //console.log('Response from API is: ', Object.keys(responseFromAPI.data.bpi));           
      //console.log('Response from API is: ', Object.values(responseFromAPI.data.bpi)); 
      return  responseFromAPI.data.bpi  
})


}


const printTheChart = (coinData => {
  coinData.then(data => {

    const coinKeys = Object.keys(data);
    const coinValues = Object.values(data); 
   
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinKeys,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinValues,
        }]
      }
    });
  })
});
  
