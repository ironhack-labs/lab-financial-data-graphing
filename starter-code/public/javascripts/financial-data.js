let from = "2010-10-01";
let to = "2019-11-20"

const bitcoinService = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical"
});


function fetchData() {
  bitcoinService.get(`/close.json?start=${from}&end=${to}`)
    .then(response => {
      const keys = Object.keys(response.data.bpi)
      const values = Object.values(response.data.bpi)
      const ctx = document.getElementById('myChart')
      const myChart = new Chart(ctx, {
        type: 'bar',
            data: {
            labels: keys,
            datasets: [{
            label: 'BitcoinData',
            data: values,
            backgroundColor: 'blue',
            borderColor: '#55C3FA',
            borderWidth: 3
          }]
        },
        options: {
          events: null,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    })
    .catch(err => {
      console.log(err)
    })
}


document.getElementById("date1").onchange = (e) => {
  from = e.target.value
  fetchData()
};

document.getElementById("date2").onchange = (e) => {
  to = e.target.value
  fetchData()
};

fetchData()


