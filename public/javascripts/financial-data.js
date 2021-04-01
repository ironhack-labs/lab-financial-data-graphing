const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'

axios
  .get(apiUrl)
  .then(responseFromAPI => {
    const bitcoin = responseFromAPI.data.bpi
    const date = Object.keys(bitcoin)
    const price = Object.values(bitcoin)
    // console.log(date, price)

    printTheChart(date, price); 
  })
  .catch(err => console.log('Error while getting the data: ', err));


  function printTheChart(date, price) {

    const ctx = document.getElementById('my-chart').getContext('2d');
    ctx.clearRect(0, 0, 700, 400);
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Stock Chart',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: price
          }
        ]
      }
    })
  }

function dateFilter(startDate, endDate){
    console.log(startDate)
    console.log(endDate)
  const apiUrl =  `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
  axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data)
        const bitcoin = responseFromAPI.data.bpi
        const date = Object.keys(bitcoin)
        const price = Object.values(bitcoin)
        // console.log(date, price)

        printTheChart(date, price); 
    })
    .catch(err => console.log('Error while getting the data: ', err));
}

  document.getElementById('date-btn').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    dateFilter(startDate, endDate);
  });