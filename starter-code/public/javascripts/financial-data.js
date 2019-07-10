
const bitcoinInfo = 'https://api.coindesk.com/v1/bpi/historical/close.json';

const sendDate = () => {
  const fromDate = document.getElementById('fromDate').value;
  console.log('data:', fromDate);
  const toDate = document.getElementById('toDate').value;

  axios.get(`${bitcoinInfo}?start=${fromDate}&end=${toDate}`)
    .then((res) => {
    // console.log(res)
      printTheChart(res.data.bpi);
    })
    .catch(error => console.log(error));
};


const printTheChart = ((bitcoinData) => {
  console.log(bitcoinData);

  const bitcoinLabels = Object.keys(bitcoinData);
  const bitcoinPrice = Object.values(bitcoinData);
  const ctx = document.getElementById('myChart').getContext('2d');
  let max = Math.max(...bitcoinPrice);
  let min = Math.min(...bitcoinPrice);

  const maxValue = document.getElementById('maxValue');
  const minValue = document.getElementById('minValue');

  maxValue.innerHTML = `Max: ${max}`;
  minValue.innerHTML = `Min: ${min}`;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitcoinLabels,
      datasets: [{
        label: 'bitcoin Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: bitcoinPrice,
      }],
    },
  });
});