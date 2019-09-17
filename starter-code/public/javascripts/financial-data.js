
document.querySelector(".get-data").onclick =function() {
  getHistoricalCoin()
}
function getHistoricalCoin () {
  let from = document.querySelector(".from").value;
  let to = document.querySelector(".to").value;
  let currency= document.getElementById("currency").value;
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`)
  .then(response=> {
    let dates= Object.keys(response.data.bpi);
    let values= Object.values(response.data.bpi);
    printChart(dates, values);
    console.log(values);

  })

}


const printChart = (labels, data) => {
  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
  
    options: {
      animation: {
        easing: 'easeOutElastic',
         duration: 2000,
      }
  },
    data: {
      labels,
      datasets: [{
        label: 'HISTORICAL',
        backgroundColor: 'RED',
        data,
      }],
      
    },
  });
};