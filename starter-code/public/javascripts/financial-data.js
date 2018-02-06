function main () {
  const start = document.getElementById('start');
  const finish = document.getElementById('finish');

  const query = 'start=${start.value}&end=${finish.value}';

  const dateOnchangeEvent = () => {
    if (start.value !== '' && finish.value !== '') {
      fn(start.value, finish.value);
    }
  };

  const fn = (start, finish) => {
    apiCall(start, finish);
  };

  const apiCall = (start, finish) => {
    axios({
      method: 'GET',
      url: 'http://api.coindesk.com/v1/bpi/historical/close.json',
      params: {
        start: start,
        end: finish
      }
    })
      .then(response => {
        console.log(response.data);
        console.log(Object.values(response.data.bpi));
        var ctx = document.getElementById('myChart').getContext('2d');
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(response.data.bpi)
            }]
          }
        // options: options
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  start.addEventListener('click', dateOnchangeEvent);
  finish.addEventListener('click', dateOnchangeEvent);
}

window.onload = main;
