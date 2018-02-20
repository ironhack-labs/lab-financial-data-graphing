
// const coindDeskApi = axios.create({
//     baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json/'
// })


function bitcoinEvolution(id) {

    var startDate = document.getElementById("initialDate").value;
    var endDate =  document.getElementById("finalDate").value;

    console.log(initialDate, finalDate)

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(response => {
     
        var date = Object.keys(response.data.bpi);
        var value = Object.values(response.data.bpi);
        
        //chart

  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: date,
          datasets: [{
              label: 'Historical BPI data',
              data: value,
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
  });
    
     
    })
    .catch(err => {
      console.error(err)
    })
  }

  

  document.getElementById("bitcoinButton").onclick=function(){
   bitcoinEvolution(1);
  };

  document.getElementById("initialDate").onchange=function(){
    bitcoinEvolution(1);
   };

  document.getElementById("finalDate").onchange=function(){
    bitcoinEvolution(1);
   };