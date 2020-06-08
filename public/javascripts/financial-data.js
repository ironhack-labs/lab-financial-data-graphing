const $startDate = document.getElementById('start-date');
const $endDate = document.getElementById('end-date');
const $currency = document.getElementById('currency');


$endDate.addEventListener('change', function(){
    start = $startDate.value;
    end = $endDate.value;
    printTheChart();
});

$startDate.addEventListener('change', function(){
    start = $startDate.value;
    end = $endDate.value;
    printTheChart();
});

$currency.addEventListener('change', function(){
    currency = $currency.value;
    printTheChart();
});

let start = "";
let end = "";
let currency = $currency.value;

window.onload = (event) => {
    printTheChart();
  };

function printTheChart() {
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;

    if (start && end) {
        url += `&start=${start}&end=${end}`;
    }
    axios.get(url)
    .then(function (response) {
      values = Object.values(response.data.bpi);
      dates = Object.keys(response.data.bpi);
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price Index',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options :{
            responsive: true,
            maintainAspectRatio: false,
        }
    });
    document.getElementById('min-value').innerHTML = `${Math.min(...values)} ${currency}`;
    document.getElementById('max-value').innerHTML = `${Math.max(...values)} ${currency}`;



    })
    .catch(function (error) {
      console.log(error);
    });
}



