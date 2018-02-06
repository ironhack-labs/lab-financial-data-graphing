'use strict';
var ctx = document.getElementById('myChart').getContext('2d');
var myLineChart = newChart(ctx, {
  type: 'line',
  data: 'data',
  options: options
});
