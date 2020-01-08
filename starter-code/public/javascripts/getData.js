// coinDesk required endPoint
import {getData, getCurrencies} from './coindesk.js';
import {drawLineChart} from './drawLineChart.js';

const ctx = document.getElementById('chart').getContext('2d');
// TODO: onload
const data = getData();
drawLineChart(ctx, data);

// getCurrencies()

document.getElementById('update-chart').addEventListener('click', (event) => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  if(startDate && endDate) {
    const data = getData(undefined,`?start=${startDate}&end=${endDate}`)
    drawLineChart(ctx, data);
  } else {
    console.log('preencha ambos os campos!')
  }
});