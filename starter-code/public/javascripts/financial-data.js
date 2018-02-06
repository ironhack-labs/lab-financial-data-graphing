'use strict';

function buildUI (container) {
  const filters = document.createElement('div');
  filters.id = 'foobar';

  const inputDate1 = document.createElement('input');
  inputDate1.setAttribute('id', 'inputDate1');
  inputDate1.value = 'Start';
  filters.appendChild(inputDate1);

  const inputDate2 = document.createElement('input');
  inputDate2.setAttribute('id', 'inputDate2');
  inputDate2.value = 'End';
  filters.appendChild(inputDate2);

  container.appendChild(filters);

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  container.appendChild(canvas);

  const button = document.createElement('button');
  button.innerText = 'Go!';
  container.appendChild(button);

  return {
    button,
    canvas,
    inputDate1,
    inputDate2
  };
}

function getData () {
  return axios({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  }).then(response => {
    console.log(response);
    return response.data.bpi;
  });
}

function buildChart (ctx, bpi, start, end) {
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      // We need to filter the dates based on the inputdate1 and inputdate2
      labels: Object.keys(bpi),
      datasets: [{
        label: 'Bitcoin Price Index',
        data: Object.values(bpi),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function main () {
  const ui = buildUI(document.getElementById('container'));
  const ctx = ui.canvas.getContext('2d');
  ui.button.addEventListener('click', () => {
    const start = ui.inputDate1.value;
    const end = ui.inputDate2.value;
    getData()
      .then(bpi => buildChart(ctx, bpi, start, end))
      .catch(err => {
        console.log(err);
      });
  });
}

window.onload = main;
