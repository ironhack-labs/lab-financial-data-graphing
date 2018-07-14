document.addEventListener('DOMContentLoaded', () => {

  const financeApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  })


  var startDate = document.getElementById("startDate");
  var endDate = document.getElementById("endDate");
  var money = document.getElementById("currency");

  startDate.onchange = function(){
    //console.log(startDate.value);
    changeDate();
  }

  endDate.onchange = function(){
    changeDate();
  }

  money.onchange = function(){
    changeDate();
  }

  function changeDate()
  {
    var dates = '?start='+startDate.value+'&end='+endDate.value+'&currency='+money.value;
  
    console.log(dates);
    financeApi.get(dates) 
    .then(function (response) {
      //console.log(response.data.bpi);
      printTheChart(response.data.bpi);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let printTheChart = ((stockData) => {
    let stockLabels = Object.keys(stockData);
    console.log(stockLabels);
    let stockPrice = Object.values(stockData);

    var minValue = document.getElementById("minValue");
    var maxValue = document.getElementById("maxValue");

    minValue.innerHTML = 'Min: ' + Math.min.apply(null, stockPrice);
    maxValue.innerHTML = 'Max: ' + Math.max.apply(null, stockPrice);

    console.log(stockPrice);
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: stockLabels,
          datasets: [{
              label: '# of Votes',
              data: stockPrice,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
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
    })
});
  
console.log('IronGenerator JS imported successfully!');

}, false);
