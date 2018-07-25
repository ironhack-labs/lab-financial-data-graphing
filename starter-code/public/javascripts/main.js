const dateInputs = document.querySelectorAll('input[type="date"]');
let params = {};

dateInputs.forEach(dateInput => {
  dateInput.addEventListener('change', (e) =>{
    params = {
      start : dateInputs[0].value,
      end : dateInputs[1].value
    }
    callToApi(params);
  });
});

const callToApi = ((params = {}) => {
  axios({
  method: "get",
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  params: params
  })
  .then(data => {
    console.log(data.data.bpi);
    printChart(data.data.bpi);
  })
  .catch(err => {
    console.log(err);
  })
});

let printChart = ((financialData) => {
  const labels = Object.keys(financialData);
  const data = Object.values(financialData);
  const ctx = document.getElementById('financial-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Bitcoin value",
        borderColor: 'rgb(255, 99, 132)',
        lineTension : 0,
        data: data,
      }]
    }
  });
});

callToApi();