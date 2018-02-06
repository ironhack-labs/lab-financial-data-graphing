$(document).ready(() => {
  let ctx = document.getElementById('myChart').getContext('2d');
  $('.form').change(() => {
    baseURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${document.getElementById(
      'dateFrom'
    ).value}&end=${document.getElementById('dateTo').value}`;
    axios
      .get(baseURL)
      .then(promise => {
        let myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(promise.data.bpi),
            datasets: [
              {
                label: 'Bitcoin Stock Liner',
                data: Object.values(promise.data.bpi),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255,99,132,1)'],
                borderWidth: 1,
              },
            ],
          },
        });
      })
      .catch(err => {
        console.error(err);
      });
  });
});
