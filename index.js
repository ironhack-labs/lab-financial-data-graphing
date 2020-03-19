let $start_date = document.querySelector('#start_date');

let $end_date = document.querySelector('#end_date');
let $button = document.querySelector('#submit');

$button.addEventListener('click', () => {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${$start_date.value}&end=${$end_date.value}`
    )
    .then(function(response) {
      let date = Object.keys(response.data.bpi);
      console.log(date);
      let price = Object.values(response.data.bpi);
      console.log();
      let ctx = document.getElementById('myChart').getContext('2d');
      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
          labels: date,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: price,
            },
          ],
        },
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});
