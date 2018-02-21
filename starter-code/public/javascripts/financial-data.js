const dataAPI = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getDataByDate (start_date, end_date, currency) {
  if (currency === undefined) {
    currency = USD;
  }
  let str = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start_date}&end=${end_date}`
  axios.get(str)
  .then(response => {
    console.log(response.data.bpi)
    let labels = [];
    let dataset = [];
    Object.keys(response.data.bpi).forEach(key => {
      labels.push(key);
      dataset.push(response.data.bpi[key]);
    });
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: dataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  })
  .catch(err => {
    console.error(err)
  })
};

var dateFrom = document.getElementById('dateFrom');
var dateTo = document.getElementById('dateTo');
var currency = document.getElementById('currency');

var updateChart = () => {
  let start_date = document.getElementById('dateFrom').value;
  let end_date = document.getElementById('dateTo').value; 
  let currency = document.getElementById('currency').value;
  let data = getDataByDate(start_date, end_date, currency);
}

dateTo.oninput = e => {
  updateChart();
};
dateFrom.oninput = e => {
  updateChart();
};
currency.onchange = e => {
  updateChart();
};

