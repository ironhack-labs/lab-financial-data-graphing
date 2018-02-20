function getCoinInfo() {
    if (document.getElementById("start-date").value !== "" && document.getElementById("end-date").value !== ""){
        
        var startDate = document.getElementById("start-date").value;
        var endDate = document.getElementById("end-date").value;

        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(response => {
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(response.data.bpi),
                datasets: [{
                    label: 'Bit Coin Values',
                    data: Object.values(response.data.bpi),
                    backgroundColor: [
                        'rgba(0,100,255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 135, 0, 1)',
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
  } else {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => {
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: Object.keys(response.data.bpi),
              datasets: [{
                  label: 'Bit Coin Values',
                  data: Object.values(response.data.bpi),
                  backgroundColor: [
                      'rgba(0,100,255, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 135, 0, 1)',
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
}

  
  document.getElementById("coinButton").onclick = function(){
    getCoinInfo();
  }

  