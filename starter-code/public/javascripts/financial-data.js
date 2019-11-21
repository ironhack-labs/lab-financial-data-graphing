let from = "2010-10-01"
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
            label: 'Bitcoin',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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