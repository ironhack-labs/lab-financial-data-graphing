const restFinancialDataApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getFinancialData() {
  restFinancialDataApi
    .get()
    .then(responseFromAPI => {
      printTheChart(Object.entries(responseFromAPI.data.bpi))
    })
    .catch(err => {
      console.log('Error is: ', err)
    })
}

getFinancialData()

/* const printTheChart = ((financialData) => {
    const financialLabels = financialData.map(element => element[0]);
    const financialPrice = financialData.map(element => element[1]);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: financialLabels,
        datasets: [{
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: financialPrice,
        }],
      },
    });
  }); */

// Filter
function filterData(date) {
  restFinancialDataApi
    .get(date)
    .then(responseFromAPI => {
      printTheChart(Object.entries(responseFromAPI.data.bpi))
    })
    .catch(err => {
      console.log('Error is: ', err)
    })
}

const printTheChart = financialData => {
  const financialLabels = financialData.map(element => element[0])
  const financialPrice = financialData.map(element => element[1])
  const ctx = document.getElementById('myChart').getContext('2d')
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: financialLabels,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: financialPrice
        }
      ]
    }
  })
}

document.getElementById('theButton').onclick = function() {
  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value
  filterData(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
}
