
const getCoinInfo = (from, to, curr) => {
  return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${curr}`).then(res=>{
    const dates = Object.keys(res.data.bpi);
    const values = Object.values(res.data.bpi);
    return {dates, values};
  });
};

const getChart = (dat, val)=> {
  const ctx = document.getElementById("myChart").getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dat,
          datasets: [{
              label: 'Amount',
              data: val,
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

const getCurr = (vals) => {
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  $('.maxNum').text(max);
  $('.minNum').text(min);
};

const paintChart = (from, to, curr) => {
  getCoinInfo(from, to, curr).then((res)=>{
    getChart(res.dates, res.values);
    getCurr(res.values);
  });
}



//INIT CHART ---------------------

var from = $('input.from').val();
var to = $('input.to').val();
var curr = $('select.currency').val();

paintChart(from, to, curr);


// CHART ON CHANGE -------------

$('.from').change((e)=>{
  to = $('input.to').val();
  curr = $('select.currency').val();
  paintChart(e.target.value, to, curr);
});

$('.to').change((e)=>{
  from = $('input.from').val();
  curr = $('select.currency').val();
  paintChart(from, e.target.value, curr);
});

$('.currency').change((e)=>{
  from = $('input.from').val();
  to = $('input.to').val();
  paintChart(from, to, e.target.value);
});
