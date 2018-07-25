    const dateFromItem = document.getElementById('date-from');
    const dateToItem = document.getElementById('date-to');
    let dateFrom = Date;
    let dateTo = Date;
    let url = 'http://api.coindesk.com/v1/bpi/historical/close.json';
 
    function drawChart(url) {
      axios.get(url)
        .then((data) => {
          console.log(data.data)
          const ctx = document.getElementById("myChart").getContext('2d');
          const myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: Object.keys(data.data.bpi), //array de dates
                  datasets: [{
                      label: 'Bitcoin Price Index', 
                      data: Object.values(data.data.bpi), //array de valors
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
          dateFromItem.value = Object.keys(data.data.bpi)[0];
          dateToItem.value = Object.keys(data.data.bpi)[Object.keys(data.data.bpi).length-1];
        })
        .catch(error => {
          console.log(error);
        })
    }
  
    // First load
    drawChart(url);

    function refreshChart() {
      dateFrom = new Date(dateFromItem.value);
      dateTo = new Date(dateToItem.value);
      const monthFrom = ('00' + dateFrom.getMonth()).slice(-2);
      const dayFrom = ('00' + dateFrom.getDate()).slice(-2);
      const monthTo = ('00' + dateTo.getMonth()).slice(-2);
      const dayTo = ('00' + dateTo.getDate()).slice(-2);
      url = 'http://api.coindesk.com/v1/bpi/historical/close.json' + '?start=' + dateFrom.getFullYear() + '-' + monthFrom + '-' + dayFrom + '&end=' + dateTo.getFullYear() + '-' + monthTo + '-' + dayTo;
      drawChart(url);
    }
    
    dateFromItem.addEventListener('change', ()  => {
      refreshChart();
    })

    dateToItem.addEventListener('change', ()  => {
      refreshChart()
    })