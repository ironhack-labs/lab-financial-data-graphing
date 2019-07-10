window.onload = function(){
  getDataInfo('2019-03-01', '2019-03-30', 'USD');
};

const stockInfo = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi',
});


const getDataInfo = (startDate, endDate, currency) => {
  console.log(startDate, endDate, currency);
  stockInfo.get(`/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then((response) => {
      printTheChart(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const printTheChart = ((stockData) => {
  const stockLabels = [];
  const stockPrice = [];
  for (const key in stockData.bpi) {
    stockLabels.push(key);
    stockPrice.push(stockData.bpi[key]);
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels,
      datasets: [{
        label: 'Stock Chart',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: stockPrice,
      }],
    },
  });
  values(stockPrice);
});

const values = stockPrice => {
  const currency = document.getElementById('currency').value;
  document.getElementById('max').innerHTML = `Max: ${Math.max(...stockPrice)} ${currency}`;
  document.getElementById('min').innerHTML = `Min: ${Math.min(...stockPrice)} ${currency}`;
  
}

document.getElementById('btnupdate').onclick = function () {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const currency = document.getElementById('currency').value;
  getDataInfo(startDate, endDate, currency);
  console.log('start:', startDate, 'enddate:', endDate)
};
