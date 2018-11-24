var ctx = document.getElementById("myChart").getContext('2d');
let dates = [];
let values = [];


axios.get("http://api.coindesk.com/v1/bpi/historical/close.json").then(res=>{
  const data = res.data;
  //console.log(Object.keys(data.bpi));
  dates = Object.keys(data.bpi);
  values = Object.values(data.bpi);
  //console.log(dates);
  return res;
}).then(() => {
  getDates(dates, values);
});


let getDates = (dat, val)=> {
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: dat,
          datasets: [{
              label: '# of Votes',
              data: val,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

let from = '0000-00-00';
let to = '0000-00-00';
let currency;
let max = 0;
let min = 0;

$('.from').change((e)=>{
  from = e.target.value;
  if (to !== '0000-00-00' && from < to) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`).then(res=>{
      const data = res.data;
      dates = Object.keys(data.bpi);
      values = Object.values(data.bpi);
      console.log(values);
    }).then(()=>{
      max = Math.max(...values);
      min = Math.min(...values);
      getDates(dates, values);
      $('.maxNum').text(max);
      $('.minNum').text(min);
    });
  }
  //console.log(from, to);
});

$('.to').change((e)=>{
  to = e.target.value;
  if (from !== '0000-00-00' && from < to) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`).then(res=>{
      //console.log(res);
      const data = res.data;
      dates = Object.keys(data.bpi);
      values = Object.values(data.bpi);
    }).then(()=>{
      max = Math.max(...values);
      min = Math.min(...values);
      getDates(dates, values);
      $('.maxNum').text(max);
      $('.minNum').text(min);
    });
  }
  //console.log(from, to);
});

$('.currency').change((e)=>{
  if (e.target.value === "USD") {
    $('.currCur').text('USD');
  } else {
    $('.currCur').text('EUR');
  }
  currency = e.target.value;
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`).then(res=>{
    console.log(res);
    const data = res.data;
    values = Object.values(data.bpi);
  }).then(()=>{
    max = Math.max(...values);
    min = Math.min(...values);
    getDates(dates, values);
    $('.maxNum').text(max);
    $('.minNum').text(min);
    console.log(max, min);
  });
});
