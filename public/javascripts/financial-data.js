const $startDate = document.getElementById('start-date');
const $endDate = document.getElementById('end-date');

$endDate.addEventListener('change', function(){
    start = $startDate.value;
    end = $endDate.value;
    printTheChart();
});

let start = "";
let end = "";

window.onload = (event) => {
    printTheChart()
  };

function printTheChart() {
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?`;

    if (start && end) {
        url += `start=${start}&end=${end}`;
    }
    axios.get(url)
    .then(function (response) {
      // handle success
      values = Object.values(response.data.bpi);
      dates = Object.keys(response.data.bpi);
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'worth',
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
    });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}


