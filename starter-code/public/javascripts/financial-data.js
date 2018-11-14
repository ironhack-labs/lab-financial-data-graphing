let values;
function getValues() {
  let from = document.getElementById('from').value;
  let to = document.getElementById('to').value;
  const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`;

  axios.get(api_url)
    .then(res => values = res.data.bpi,)

    .then(closes => drawChart(closes));
}
getValues();

document.getElementById('update-value').addEventListener('click', () => {
  getValues();
});


const drawChart = (data) => {
  console.log(values);

  const stockDate = Object.keys(values);
  const stockPrice = Object.values(values);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDate,
      datasets: [
        {
          label: 'Stock Chart',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrice,
        },
      ],
    },
  });
};
