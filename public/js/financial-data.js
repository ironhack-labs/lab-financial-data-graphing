
const dateFrom = document.getElementById('date-from')
const dateTo = document.getElementById('date-to')

//** EVENT LISTNER ON ONE ELEMENT **//

dateFrom.addEventListener('change', (event) => {
  axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom.value}&end=${dateTo.value}&currency=USD`)
  .then(responseFromAPI => {
    // console.log(responseFromAPI.data.bpi)
    printTheChart(responseFromAPI.data.bpi)
  })
  .catch(err => {
    console.log(err)
  });

  function printTheChart(stockData) {
    const dailyDates = Object.keys(stockData)
    const dailyValues = Object.values(stockData)
    
    const ctx = document.getElementById('my-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dailyDates,
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dailyValues
          }
        ]
      }
    }); // closes chart = new Chart()
  } // closes printTheChart()
});



// **** ATTEMPT AT EVENTLISTNER ON BOTH **** //

// dateFrom.addEventListener('change', (printTheChart))
// dateTo.addEventListener('change',(printTheChart))

// function printTheChart() {
//   axios
//   .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom.value}&end=${dateTo.value}&currency=USD`)
//   .then(responseFromAPI => {
//     const dailyDates = Object.keys(responseFromAPI.data.bpi)
//     const dailyValues = Object.values(responseFromAPI.data.bpi)
//     const ctx = document.getElementById('my-chart').getContext('2d')
//     let chart = ''
//     chart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: dailyDates,
//         datasets: [
//           {
//             label: 'Stock Chart',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: dailyValues
//           }
//         ]
//       }
//     }) // closes chart = new Chart()
//    }) // closes printTheChart()
// }
