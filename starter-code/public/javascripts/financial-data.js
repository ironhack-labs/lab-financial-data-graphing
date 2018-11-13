const btnDate = document.getElementById('btnDate');
const beginDate = document.getElementById('beginDate');
const endDate = document.getElementById('endDate');
const currency = document.getElementById('currency');


const coinDesk = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/'
})

coinDesk.get('close.json')
    .then(res => {
        const Labels = Object.keys(res.data.bpi);
        const Price = Object.values(res.data.bpi);
        let sortedPrice = Price.sort();
        document.getElementById('max').innerHTML = sortedPrice[Price.length-1] + ' ' + currency.value;
        document.getElementById('min').innerHTML = sortedPrice[0] + ' ' + currency.value;
        printChart(Labels, Price);
    })
    .catch(err => {
        console.log(err);
    })

const printChart = (Labels, Price) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Labels,
      datasets: [{
        label: "Bitcoin Price Chart",
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 99, 132)',
        data: Price,
      }]
    }
  });
};

btnDate.addEventListener('click', () => {
    coinDesk.get(`close.json?currency=${currency.value}&start=${beginDate.value}&end=${endDate.value}`)
    .then(res => {
        const Labels = Object.keys(res.data.bpi);
        const Price = Object.values(res.data.bpi);
        let sortedPrice = Price.sort();
        document.getElementById('max').innerHTML = sortedPrice[Price.length-1] + ' ' + currency.value;
        document.getElementById('min').innerHTML = sortedPrice[0] + ' ' + currency.value;
        printChart(Labels, Price);
    })
    .catch(err => {
        console.log(err);
    })
})