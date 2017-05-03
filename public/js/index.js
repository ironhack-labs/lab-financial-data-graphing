function getCoinDeskInfo(startDate, endDate, currency) {
  $.ajax({
    url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`,
    method: 'GET',
    success (response) {
      console.log(response);
      const dataobj = JSON.parse(response);
      console.log(dataobj);
      console.log(dataobj.bpi);

      const data1 = [];
      const data2 = [];

      for (var property in dataobj.bpi) {
        if (!dataobj.bpi.hasOwnProperty(property)) {
          continue;
        }
        data1.push(property);
        data2.push(dataobj.bpi[property]);
      }
      console.log(data1);
      console.log(data2);

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data1,
        datasets: [{
            label: '# of Votes',
            data: data2,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
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

    },
    error (err) {
      console.log(err);
    },
  });
}



$('#getdata').on('click', () => {
  const sDate = $('#startDate').val();
  const eDate = $('#endDate').val();
  const currency =  $('#curr option:selected').text();
  console.log(currency);
  getCoinDeskInfo(sDate, eDate, currency);
});
